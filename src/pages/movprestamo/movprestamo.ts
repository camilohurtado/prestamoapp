import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { MovPrestamo } from '../../models/movprestamo';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

/**
 * Generated class for the MovprestamoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {name:"mov-prestamo", segment:"mov-prestamo"}
)
@Component({
  selector: 'page-movprestamo',
  templateUrl: 'movprestamo.html',
})
export class MovprestamoPage {

  unCodigoPrestamo: any;
  unosMovPrestamo: Array<MovPrestamo>;
  unaAccion: any
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public con: ProveedorUsuarioProvider) {

    this.unCodigoPrestamo = this.navParams.get("codigo_prestamo");
    this.unaAccion = this.navParams.get("una_accion");
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MovprestamoPage');
  }

  crearDetakke(){

  }

  consultaDetalle(id: any){

  }

}
