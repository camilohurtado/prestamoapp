import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'login', segment:'login'})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  usuario:any;
  password:any;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public con:ProveedorUsuarioProvider, 
              public conf_usuario:ProveedorSessionProvider,
              public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  validarLogin(){

    console.log(this.usuario);
    console.log(this.password);

    this.con.login(this.usuario, this.password).
             subscribe(resultado => {

              console.log(resultado);
              console.log(resultado.length);

              if(resultado.length > 0){

                resultado = resultado[0];
                this.conf_usuario.set("usu", resultado);
                this.navCtrl.setRoot("inicio");
                

              }else{

                this.showAlert("Error", "Usuario invalido");

              }


             });

  }


  showAlert(titulo: any, contenido: any) {
    
    let alert = this.alertCtrl.create({

      title:titulo,
      subTitle:contenido,
      buttons:['OK']

    });
    
    alert.present();

  }





  

}
