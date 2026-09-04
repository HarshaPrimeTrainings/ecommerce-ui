import { inject } from "@angular/core";
import { KeycloakService } from "./keycloak";
import { CanActivateFn } from "@angular/router";

export const autGaurd: CanActivateFn = (route,state)=>{
const keycloakservice = inject(KeycloakService);
if(keycloakservice.isAuthenticated()){
    return true;
}
keycloakservice.login();
return false;

};