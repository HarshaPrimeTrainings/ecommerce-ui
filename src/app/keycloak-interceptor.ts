import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { KeycloakService } from "./keycloak";

export const keycloakinterceptor:HttpInterceptorFn = (req,next)=>{
const keycloakserv = inject(KeycloakService);
const token = keycloakserv.getToken();

console.log('token --> '+token);
if(token){
    req = req.clone({
        setHeaders:{
            Authorization: `Bearer ${token}`
        }
    });
}

return next(req);
};