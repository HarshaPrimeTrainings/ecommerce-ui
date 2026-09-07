import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { KeycloakService } from "./keycloak";

export const keycloakinterceptor:HttpInterceptorFn = (req,next)=>{
    
const keycloakserv = inject(KeycloakService);
const token = keycloakserv.getToken();
if(token){
    console.log('---')
    
    req = req.clone({
        setHeaders:{
            Authorization: `Bearer ${token}`
        }
    });
    console.log(req);
}

return next(req);
};