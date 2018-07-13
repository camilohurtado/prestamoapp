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

                this.listenEvents();    
                     

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConequiposPage');
    
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

    console.log('inside event');
    this.events.subscribe('reloadConEquipos',() => {
     //call methods to refresh content
     console.log(this.navCtrl.getActive);
     //this.navCtrl.push('conequipos');
     //this.navCtrl.pop();
     //this.refresh();
    });
  }

  refresh(): void {
    console.log('Inside refresh');
    console.log(window.location);
    window.location.reload();
}

buscarEquipos(){
  console.log('Buscar equipos');
  console.log(this.busqueda);

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
