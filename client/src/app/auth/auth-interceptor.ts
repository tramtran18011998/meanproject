import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AccountService } from '../service/admin/account.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService, private router: Router){}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        //if(request.headers.get(''))
        const clonereq = request.clone({
            headers: request.headers.set("Authorization","Bearer"+ localStorage.getItem('token'))
        })
        // request = request.clone({
        //     setHeaders: {
        //         authorization:
        //             `Bearer  ${localStorage.getItem("theToken")}`
        //     }
        // })
        // return next.handle(clonereq).pipe(
        //     tap(
        //         event => {},
        //         err => {
        //             if(localStorage.getItem('token')==''){
        //                 this.router.navigateByUrl('/login');
        //             }
        //         }
        //     )
        // )
        return next.handle(clonereq);
    }
}
