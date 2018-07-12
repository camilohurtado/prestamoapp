import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Equipo } from '../../models/Equipo';


/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {

  constructor(public http: Http) {
    console.log('Hello ServicesProvider Provider');
  }

  private urlLogin : string = 'http://localhost:8088/gestion-prestamo/login';
  private urlGetRoles: string = 'http://localhost:8088/gestion-prestamo/rol-usuario';
  private urlSaveEquipo: string = 'http://localhost:8088/gestion-prestamo/saveEquipo';

  private login(id: string, password: string){
    return this.http.
    get(this.urlLogin, {params: {
      id: id, clave: password
    }})
    .map( (res:any) => {
      console.log('Entro al servicio de login');
      return JSON.parse(res._body);
    });
  }

  private getRoles(id: string){
    return this.http
    .get(this.urlGetRoles, {params: {
      id: id
    }})
    .map( (res: any) => {
      console.log('Entro al metodo getRoles');
      return JSON.parse(res._body);
    });
  }

  private saveUpdateEquipo(equipo: Equipo){
    return this.http
    .post(this.urlSaveEquipo, equipo)
    .map( res => console.log('entro al metodo saveUpdateEquipo'));
  }

}
