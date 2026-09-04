import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {keycloakinterceptor} from './keycloak-interceptor';

import { routes } from './app.routes';
import { KeycloakService } from './keycloak';


export function initKeyCloak(keycloakservice:KeycloakService):()=>Promise<boolean>{
  return ()=>keycloakservice.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([keycloakinterceptor])),
    KeycloakService,{
      provide:APP_INITIALIZER,
      useFactory : initKeyCloak,
      deps:[KeycloakService],
      multi:true
    }
  ]
};
