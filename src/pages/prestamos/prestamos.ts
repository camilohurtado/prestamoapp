import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';

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

  unosPrestamos: any;

  nombre_usuario: any;
  codigo_usuario: any;
  constructor(public navCtrl: NavController, public navParams: NavParams , private con: ProveedorUsuarioProvider,
    private session: ProveedorSessionProvider) {
      this.nombre_usuario = this.session.getUsuario("NOMBRE");
    this.codigo_usuario = this.session.getUsuario("USUARIO_ID");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestamosPage');
    this.traeConsultaPrestamos();
  }

  //Traer todos los equipos -- Profe Cesar.
  traeConsultaPrestamos() {

    this.con.consultaPrestamos(this.codigo_usuario).subscribe(res => {
      this.unosPrestamos = res;
      console.log(this.unosPrestamos);
    }, error => {
      console.log(error);
    });

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

  detallePrestamo(id :any){

    this.busqueda = '%'
    this.navCtrl.push('mov-prestamo', 
    {
      codigo_prestamo: id,
      una_accion: 'ACTUALIZAR'
    });

  }

  consultarPrestamo(id :any){

    this.navCtrl.push('prestamo',
    {
      codigo_prestamo: id,
      una_accion: 'ACTUALIZAR'
    });

  }

}
