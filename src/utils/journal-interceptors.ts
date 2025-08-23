import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, tap } from "rxjs";
import { JournalService } from "src/journal/journal.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly journalService:JournalService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context?.switchToHttp()?.getRequest<Request>();
        const { statusCode } = context?.switchToHttp()?.getResponse<Response>();
        const { originalUrl, method, params, query, body, headers } = req;
        const requestTime = new Date();
        console.log('Request:', { method, url: originalUrl, params, query, body, headers, date: requestTime });
        const request = {
            originalUrl,
            method,
            params,
            query,
            body,
            headers,
        };

        return next.handle().pipe(
            tap((data) => {
                const response = { statusCode};
                if(request.method !== 'GET'){
                    this.journalService.create({method:request.method,date:requestTime,url:req.url,status:response.statusCode});
                }
                
            }),
        );
    }

}