import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  

  private keycloak: Keycloak | null = null;


  async init(): Promise<boolean> {
    this.keycloak = new Keycloak({
    url: 'http://localhost:7079',
    realm: 'springkeycloak',
    clientId: 'springclient'
  });
    try {
      const authenticated = await this.keycloak.init({
        onLoad:'login-required',
        checkLoginIframe : false
      });


      console.log('Keycloak initialized');
      console.log('Authenticated:', authenticated);

      return authenticated;

    } catch (error) {
      console.error('Keycloak initialization failed:', error);
      return false;
    }
  }

  getKeyCloak():Keycloak | null{
    return this.keycloak;
  }

  isAuthenticated(): boolean{
    return this.keycloak?.authenticated??false;
  }

  getToken(): string | undefined {
    console.log(this.keycloak?.token)
    return this.keycloak?.token;
  }

  login(): void {
    console.log('Login clicked');
    if(this.keycloak){
      this.keycloak.login();
    }
  }

  logout():void{
    if(this.keycloak){
        this.keycloak.logout();
    }
  }

  
}