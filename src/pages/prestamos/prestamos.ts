import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrestamosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"prestamos", segment:"prestamos"
})
@Component({
  selector: 'page-prestamos',
  templateUrl: 'prestamos.html',
})
export class PrestamosPage {
  private busqueda:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestamosPage');
  }


  crearPrestamo(){
    this.navCtrl.push('prestamo',
  {
    unprestamo: -1,
    una_accion: 'CREAR'
  });
  }

  vaaprestamo(prest:any){
    this.navCtrl.push('prestamo',{unprestamo:prest,una_accion:'ACTUALIZAR'});
  }

  buscarPrestamo(){}

}
