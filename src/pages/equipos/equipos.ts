import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';
import { Equipo } from '../../models/modelo_equipos';

/**
 * Generated class for the EquiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:"equipos", segment:"equipos"})
@Component({
  selector: 'page-equipos',
  templateUrl: 'equipos.html',
})
export class EquiposPage {

  equipo:any;
  equipoBD:any;
  datos_equipo = {} as Equipo;

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public con:ProveedorUsuarioProvider, 
            public conf_usuario:ProveedorSessionProvider) {

              this.equipo = this.navParams.get("unequip");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquiposPage');
  }

  consultaEquipo(){

    this.con.traerUnEquipo(this.equipo).subscribe(resultado => {

      console.log(resultado);
      console.log(resultado.length);
      this.equipoBD = resultado;

      this.datos_equipo.EQUIPO_ID = this.equipoBD[0].EQUIPO_ID;
      this.datos_equipo.DESCRIPCION = this.equipoBD[0].DESCRIPCION;
      this.datos_equipo.REFERENCIA = this.equipoBD[0].REFERENCIA;
      this.datos_equipo.TIPO_EQUIPO_ID = this.equipoBD[0].TIPO_EQUIPO_ID;
      this.datos_equipo.SERIAL= this.equipoBD[0].SERIAL;
      this.datos_equipo.ESTADO = this.equipoBD[0].ESTADO;
      this.datos_equipo.FECHA_REG = this.equipoBD[0].FECHA_REG;
      

     }, error =>{

      console.log(error);

     });
  }


}
