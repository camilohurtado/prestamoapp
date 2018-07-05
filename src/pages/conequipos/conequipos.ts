import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

/**
 * Generated class for the ConequiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"conequipos", segment:"conequipos"
})
@Component({
  selector: 'page-conequipos',
  templateUrl: 'conequipos.html',
})
export class ConequiposPage {

  public unosequipos:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public con:ProveedorUsuarioProvider, 
              public conf_usuario:ProveedorSessionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConequiposPage');
    this.consultarEquipos();
  }

  consultarEquipos(){

    this.con.traerEquipos().subscribe(resultado => {

      console.log(resultado);
      console.log(resultado.length);
      this.unosequipos = resultado;

     });
  }

  vaaequipo(equipo:any){


    this.navCtrl.push('equipos', {unequip:equipo});

  }

}
