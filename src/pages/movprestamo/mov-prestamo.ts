import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

/**
 * Generated class for the MovPrestamoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'mov_prestamo',
  segment: 'mov_prestamo'
})

@Component({
  selector: 'page-mov-prestamo',
  templateUrl: 'mov-prestamo.html',
})
export class MovPrestamoPage {
  
  unosMovPrestamos: any;
  
  unaAccion: any;

  //Esta variable es el codigo del Prestamo que voy a cargar
  unCodigoPrestamo: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private con: ProveedorUsuarioProvider
            ) {

    //Aqui asigno el valor del Equipo pasado como parametro
    //Desde otro formulario  
    this.unCodigoPrestamo = this.navParams.get("codigo_prestamo");
    this.unaAccion = this.navParams.get("una_accion");    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovPrestamoPage');
    this.traeconsultaMovPrestamos();
  }


  ionViewDidEnter() {
    //if (this.busqueda != '') {
      this.traeconsultaMovPrestamos();
    //}
  }

  traeconsultaMovPrestamos() {

    this.con.consultaMovPrestamo(this.unCodigoPrestamo).subscribe(res => {
      this.unosMovPrestamos = res;
      console.log(this.unosMovPrestamos);
    }, error => {
      console.log(error);
    });

  }





consultaDetalle(anCodigoMovPrestamo: any) {
    this.navCtrl.push('mov_prestamo_detalle',
      {
        codigo_prestamo: this.unCodigoPrestamo,
        codigo_mov_prestamo: anCodigoMovPrestamo,
        una_accion: 'ACTUALIZAR'
      });
  }

  //Da la posibilidad de crear un equipo la nueva
  //Pagina de equipo, y le damos la posibilidad de
  //Realizar la insercion de un equipo que ya existe.
  //Podemos insertar y cancelar el proceso.
  creaDetalle() {
    this.navCtrl.push('mov_prestamo_detalle',
      {
        codigo_prestamo: this.unCodigoPrestamo,
        codigo_mov_prestamo: -1,
        una_accion: 'CREAR',
       });
  }

}
