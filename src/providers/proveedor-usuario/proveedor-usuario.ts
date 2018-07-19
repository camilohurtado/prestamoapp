import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import { ProveedorSessionProvider } from '../proveedor-session/proveedor-session';
/*
  Generated class for the ProveedorUsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProveedorUsuarioProvider {

  private urlLogin: string = "http://192.168.1.37/login_user_oracle_get.php";
  private urlperfiles: string = "http://192.168.1.37/perfiles_user_get.php";
  private urlconequipos: string = "http://192.168.1.37/consulta_equipos.php";
  private urlequipo: string = "http://192.168.1.37/trae_equipo_get.php";
  private urlcrudequipo: string = "http://192.168.1.37/gestiona_equipo_get.php";
  private urlbusquedaequipos: string = "http://192.168.1.37/consulta_equipos_v1.php";

  constructor(public http:Http, public session:ProveedorSessionProvider) {
    console.log('Hello ProveedorUsuarioProvider Provider');
  }

  login(usuario: string, password: string) {

          
          return this.http.get(this.urlLogin,
            { params: { codigo_usuario: usuario, clave_usuario: password } })
            .map(res => res.json());
    
          
      
      }

    traerPerfiles(){

      let cod_usuario = this.session.getUsuario("USUARIO_ID");

      return this.http.get(this.urlperfiles,
        { params: { codigo_usuario: cod_usuario} })
        .map(res => res.json());

    }

    traerEquipos(){

      return this.http.get(this.urlconequipos).map(res => res.json());

    }

    traerUnEquipo(cod_equipo:any){
      console.log('traerUnEquipo: ' + cod_equipo);
      return this.http.get(this.urlequipo,{ params:{codigo_equipo:cod_equipo}}).map(res => res.json());

    }

    utilizaCrudEquipo(unaOperacion: any,
      unCodigo_equipo: any,
      unaDesc_equipo: any,
      unaReferencia: any,
      unTipo_equipo: any,
      unSerial: any,
      unEstado) {
            
      return this.http.get(this.urlcrudequipo,
        {
          params: {
            opera: unaOperacion,
            codigo_equipo: unCodigo_equipo,
            desc_equipo: unaDesc_equipo,
            referencia: unaReferencia,
            tipo_equipo: unTipo_equipo,
            serial: unSerial,
            estado: unEstado
          }
        })
        .map(res => res.json());
    }

    traeBusquedaEquipos(busqueda:any){

      return this.http.get(this.urlbusquedaequipos,
        { params: { una_descripcion: busqueda} })
        .map(res => res.json());


    }

    


}