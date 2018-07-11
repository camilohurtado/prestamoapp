import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';
import { Events } from 'ionic-angular';

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
  public busqueda:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public con:ProveedorUsuarioProvider, 
              public conf_usuario:ProveedorSessionProvider,
              public events:Events) {

                

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConequiposPage');
    this.listenEvents();
    this.llamarEquipos();
    
  }

  llamarEquipos(){
    this.con.traerEquipos().subscribe(resultado => {
      this.unosequipos=resultado;
      console.log(this.unosequipos);
     });  
  }

  vaaequipo(equip:any){
    this.navCtrl.push('equipos',{unequip:equip,una_accion:'ACTUALIZAR'});
  }

  creaEquipo(){
    this.navCtrl.push('equipos',
  {
    unequip: -1,
    una_accion: 'CREAR'
  });
  }
  listenEvents(){
    this.events.subscribe('reloadConEquipos',() => {
     //call methods to refresh content
     this.navCtrl.push('conequipos');
     this.refresh();
    });
  }

  refresh(): void {
    window.location.reload();
}

buscarEquipos(){

  if(this.busqueda === ''){
    this.llamarEquipos();
  }else{
    this.con.traeBusquedaEquipos(this.busqueda).subscribe(resultado => {
      this.unosequipos=resultado;
      console.log(this.unosequipos);
     });  
  }

  
  
}

}
