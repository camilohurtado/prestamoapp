import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:"inicio", segment:"inicio"})
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  nombre_usuario:any;
  unosperfiles:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public ses:ProveedorSessionProvider,
              public con:ProveedorUsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
    this.traeNombreUsu();
    this.traerperfilexusuario();
  }

  traeNombreUsu(){

    this.nombre_usuario = this.ses.getUsuario("NOMBRE");
    console.log('Nombre de usuario -> '+ this.nombre_usuario);
  }

  
  traerperfilexusuario(){
       
    this.con.traerPerfiles().subscribe(resultado => {

        console.log(resultado);
        console.log(resultado.length);
        this.unosperfiles = resultado;

       });
  }


  iraopcion(entrada:string){

    console.log('Opcion: ' + entrada);
    this.navCtrl.push(entrada);
    
  }

}
