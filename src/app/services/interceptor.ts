import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AccountService } from "./account.service";

export const interceptor: HttpInterceptorFn = (req, next) => {
    const accountService = inject(AccountService);
    const token = accountService.getToken();
    const headers = req.headers.set('Authorization', `Bearer ${token}`);

    req = req.clone({ headers });

    return next(req);
};