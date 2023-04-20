import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  protected tokenJwt: string;

  constructor() { }

  setJwt(token: string){
    this.tokenJwt = token
  }

  getJwt(){
    return this.tokenJwt
  }
}
