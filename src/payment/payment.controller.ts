import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Request } from 'express';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';


function SHA256Encrypt(password) {
  let sha256 = createHash('sha256');
  sha256.update(password);
  return sha256.digest('hex');
}

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,
    private readonly config: ConfigService

  ) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto, @Req() req: Request) {
    // Si l'utilisateur n'est pas spécifié, utiliser l'utilisateur connecté
    if (!createPaymentDto.user && req.user) {
      createPaymentDto.user = req.user['userId'];
    }
    const payment = await this.paymentService.create({...createPaymentDto,statut:'en_attente'});
    let paymentRequestUrl = "https://paytech.sn/api/payment/request-payment";// http client
    let params = {
    item_name:"Abonnement Gestion Commercial" + payment.type_abonnement,
    item_price:payment.montant,
    currency:"XOF",
    ref_command:payment._id,
    command_name:"Paiement gestion commercial pour " + payment.montant + " XOF",
    env:"prod",
    success_url:this.config.get('APP_URL') + "/success",
    cancel_url:this.config.get('APP_URL') + "/cancel",
    ipn_url:this.config.get('BACKEND_URL') + "/payment/ipn"
    };

    let headers = {
    Accept: "application/json",
    'Content-Type': "application/json",
    API_KEY: this.config.get('API_KEY_PAYTECH'),
    API_SECRET: this.config.get('API_SECRET_PAYTECH'),
    };


    return fetch(paymentRequestUrl, {
      method:'POST',
      body:JSON.stringify(params),
      headers: headers
      })
      .then(function (response) {
      return response.json()
      })
      .then(function (jsonResponse) {
      return jsonResponse;
      }).catch((error) => {
        console.log(error)
      })
  }

  @Post('ipn')
  async ipn(@Body() ipnDto: any) {
    let type_event = ipnDto.type_event;
    let ref_command = ipnDto.ref_command;
    let api_key_sha256 = ipnDto.api_key_sha256;
    let api_secret_sha256 = ipnDto.api_secret_sha256;
    let payment_method = ipnDto.payment_method;
    let my_api_key = this.config.get('API_KEY_PAYTECH');
    let my_api_secret = this.config.get('API_SECRET_PAYTECH');

    if(SHA256Encrypt(my_api_secret) === api_secret_sha256 && SHA256Encrypt(my_api_key) === api_key_sha256)
    {
      if(type_event === 'sale_complete'){
        await this.paymentService.update(ref_command,{statut:'valide',methode_paiement:payment_method})
      }
      else {
        await this.paymentService.remove(ref_command);
      }
    }
    else{
      console.log("from someone else");
    }
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }
  
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.paymentService.findByUser(userId);
  }
  
  @Get('subscription/active/:userId')
  getActiveSubscription(@Param('userId') userId: string) {
    return this.paymentService.getActiveSubscription(userId);
  }
  
  @Get('subscription/verify/:userId')
  verifySubscription(@Param('userId') userId: string) {
    return this.paymentService.verifySubscription(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
