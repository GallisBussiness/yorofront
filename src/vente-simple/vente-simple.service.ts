import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  VenteSimple,
  VenteSimpleDocument,
} from './entities/vente-simple.entity';
import { CreateVenteSimpleDto } from './dto/create-vente-simple.dto';
import { UpdateVenteSimpleDto } from './dto/update-vente-simple.dto';
import {
  JourBucket,
  Periode,
  TotauxResultat,
} from './dto/totaux.dto';

@Injectable()
export class VenteSimpleService {
  constructor(
    @InjectModel(VenteSimple.name)
    private readonly model: Model<VenteSimpleDocument>,
  ) {}

  async create(userId: string, dto: CreateVenteSimpleDto): Promise<VenteSimple> {
    const date = new Date();
    const ref = await this.generateRef(userId, date);
    try {
      const created = new this.model({
        ...dto,
        ref,
        date,
        userId: new Types.ObjectId(userId),
      });
      return await created.save();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAllByUser(
    userId: string,
    from?: Date,
    to?: Date,
  ): Promise<VenteSimple[]> {
    const filter: Record<string, unknown> = {
      userId: new Types.ObjectId(userId),
    };
    const dateFilter: Record<string, Date> = {};
    if (from) dateFilter.$gte = from;
    if (to) dateFilter.$lte = to;
    if (from || to) filter.date = dateFilter;
    try {
      return await this.model
        .find(filter)
        .sort({ date: -1 })
        .lean();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOneForUser(id: string, userId: string): Promise<VenteSimple> {
    if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
      throw new NotFoundException(`Vente simple ${id} introuvable`);
    }
    try {
      const doc = await this.model
        .findOne({
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        })
        .lean();
      if (!doc) {
        throw new NotFoundException(`Vente simple ${id} introuvable`);
      }
      return doc;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(error, 500);
    }
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateVenteSimpleDto,
  ): Promise<VenteSimple> {
    const existing = await this.findOneForUser(id, userId);
    this.assertEditable(existing);
    try {
      const updated = await this.model.findByIdAndUpdate(
        id,
        { $set: dto },
        { new: true },
      );
      if (!updated) {
        throw new NotFoundException(`Vente simple ${id} introuvable`);
      }
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(error, 500);
    }
  }

  async remove(id: string, userId: string): Promise<VenteSimple> {
    const existing = await this.findOneForUser(id, userId);
    this.assertEditable(existing);
    try {
      const deleted = await this.model.findByIdAndDelete(id);
      if (!deleted) {
        throw new NotFoundException(`Vente simple ${id} introuvable`);
      }
      return deleted;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(error, 500);
    }
  }

  async getTotal(userId: string, periode: Periode): Promise<TotauxResultat> {
    const { from, to } = this.computePeriodeRange(periode);
    return this.aggregate(userId, from, to, periode);
  }

  async getTotalByRange(
    userId: string,
    from: Date,
    to: Date,
  ): Promise<TotauxResultat> {
    return this.aggregate(userId, from, to, 'custom');
  }

  private async aggregate(
    userId: string,
    from: Date,
    to: Date,
    periode: Periode | 'custom',
  ): Promise<TotauxResultat> {
    try {
      const rows = await this.model.aggregate<{
        _id: string;
        total: number;
        count: number;
      }>([
        {
          $match: {
            userId: new Types.ObjectId(userId),
            date: { $gte: from, $lte: to },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            total: { $sum: '$montant' },
            count: { $sum: 1 },
          },
        },
      ]);

      const map = new Map<string, JourBucket>();
      for (const r of rows) {
        map.set(r._id, { jour: r._id, total: r.total, count: r.count });
      }

      const parJour: JourBucket[] = [];
      let total = 0;
      let count = 0;
      for (const day of eachDay(from, to)) {
        const key = day.toISOString().slice(0, 10);
        const bucket = map.get(key) ?? {
          jour: key,
          total: 0,
          count: 0,
        };
        parJour.push(bucket);
        total += bucket.total;
        count += bucket.count;
      }

      return {
        periode,
        from: from.toISOString(),
        to: to.toISOString(),
        total,
        count,
        parJour,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  private assertEditable(vente: VenteSimple): void {
    if (!isSameDay(vente.date, new Date())) {
      throw new ForbiddenException(
        'Seules les ventes du jour courant peuvent être modifiées ou supprimées.',
      );
    }
  }

  private async generateRef(userId: string, date: Date): Promise<string> {
    const year = date.getFullYear();
    const prefix = `VS-${year}-`;
    try {
      const last = await this.model
        .findOne(
          { userId: new Types.ObjectId(userId), ref: { $regex: `^${prefix}` } },
          { ref: 1 },
        )
        .sort({ ref: -1 })
        .lean();
      let next = 1;
      if (last?.ref) {
        const num = parseInt(last.ref.replace(prefix, ''), 10);
        if (!Number.isNaN(num)) next = num + 1;
      }
      return `${prefix}${String(next).padStart(4, '0')}`;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  private computePeriodeRange(periode: Periode): { from: Date; to: Date } {
    const now = new Date();
    if (periode === 'jour') {
      const from = startOfDay(now);
      const to = endOfDay(now);
      return { from, to };
    }
    if (periode === 'semaine') {
      const from = startOfWeek(now);
      const to = endOfWeek(now);
      return { from, to };
    }
    // mois calendaire
    const from = startOfMonth(now);
    const to = endOfMonth(now);
    return { from, to };
  }
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function startOfWeek(d: Date): Date {
  const x = startOfDay(d);
  const day = x.getDay(); // 0 = dimanche, 1 = lundi
  const diff = day === 0 ? -6 : 1 - day; // ramener à lundi
  x.setDate(x.getDate() + diff);
  return x;
}

function endOfWeek(d: Date): Date {
  const start = startOfWeek(d);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return endOfDay(end);
}

function startOfMonth(d: Date): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
  return x;
}

function endOfMonth(d: Date): Date {
  const x = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
  return x;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function* eachDay(from: Date, to: Date): IterableIterator<Date> {
  const cur = startOfDay(from);
  const end = startOfDay(to);
  while (cur.getTime() <= end.getTime()) {
    yield new Date(cur);
    cur.setDate(cur.getDate() + 1);
  }
}
