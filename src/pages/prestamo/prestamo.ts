import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrestamoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:"prestamo", segment:"prestamo"})
@Component({
  selector: 'page-prestamo',
  templateUrl: 'prestamo.html',
})
export class PrestamoPage {

  private una_accion:any
  private unprestamo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.unprestamo = this.navParams.get("unprestamo");
    this.una_accion = this.navParams.get("una_accion");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestamoPage');
  }

  insertarPrestamo(){}


}
