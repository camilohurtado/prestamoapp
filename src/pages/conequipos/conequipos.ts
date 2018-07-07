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
    this.llamarEquipos();
  }

 /* consultarEquipos(){

    this.con.traerEquipos().subscribe(resultado => {

      console.log(resultado);
      console.log(resultado.length);
      this.unosequipos = resultado;

     });
  }*/

  llamarEquipos(){
    this.con.traerEquipos().subscribe(resultado => {
      this.unosequipos=resultado;
      console.log(this.unosequipos);
     });  
  }

  vaaequipo(equip:any){
    console.log(equip);
    this.navCtrl.push('equipos',{unequip:equip,una_accion:'ACTUALIZAR'});
  }

  creaEquipo(){
    this.navCtrl.push('equipos',
  {
    unequip: -1,
    una_accion: 'CREAR'
  });
  }

}
