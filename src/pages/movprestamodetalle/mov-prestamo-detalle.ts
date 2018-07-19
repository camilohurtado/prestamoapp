import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MovPrestamo } from '../../models/movprestamo';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

/**
 * Generated class for the MovPrestamoDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'mov_prestamo_detalle',
  segment: 'mov_prestamo_detalle'
})
@Component({
  selector: 'page-mov-prestamo-detalle',
  templateUrl: 'mov-prestamo-detalle.html',
})
export class MovPrestamoDetallePage {
  unaAccion: any;

  //Esta variable es el codigo del Prestamo que voy a cargar
  unCodigoPrestamo: any;
  unCodigoMovPrestamo: any;

  //Esta variable es un objeto para mastrarlo en el Formulario
  datosMovPrestamo = {} as MovPrestamo;

  //Esta variable va a cargar los datos del Provider, como JSON
  unMovPrestamo: any;
 
  nombre_usuario: any;
  codigo_usuario: any;

  myDate: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private con: ProveedorUsuarioProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {

    //Aqui asigno el valor del Equipo pasado como parametro
    //Desde otro formulario  
    this.unCodigoPrestamo = this.navParams.get("codigo_prestamo");
    this.unCodigoMovPrestamo = this.navParams.get("codigo_mov_prestamo");

    this.unaAccion = this.navParams.get("una_accion");

    console.log(this.unCodigoMovPrestamo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovPrestamoDetallePage');

    if (this.unaAccion == 'ACTUALIZAR') {
      this.consultaMovPrestamo();
    }
    else if (this.unaAccion == 'CREAR') {
   
      this.datosMovPrestamo.MOV_PRESTAMO_ID = -1;
      this.datosMovPrestamo.PRESTAMO_ID = this.unCodigoPrestamo;
      this.datosMovPrestamo.EQUIPO_ID = -1;
      this.myDate = new Date().toISOString()
      this.datosMovPrestamo.FECHA_REGISTRO = new Date().toISOString();
      this.datosMovPrestamo.FECHA_DEVOLUCION = new Date().toISOString();
      this.datosMovPrestamo.FECHA_ENTREGA = new Date().toISOString();
    }
  }

  consultaMovPrestamo() {
    //Aqui consumo la URL de provider, con el codigo del Equipo
    this.con.consultaMovPrestamoDet(this.unCodigoMovPrestamo).subscribe(res => {
      //Aqui es resultado es cargado a la variable como JSON
      this.unMovPrestamo = res;

      console.log(res);

      this.datosMovPrestamo.MOV_PRESTAMO_ID = this.unMovPrestamo[0].MOV_PRESTAMO_ID;
      this.datosMovPrestamo.PRESTAMO_ID = this.unMovPrestamo[0].PRESTAMO_ID;
      this.datosMovPrestamo.EQUIPO_ID = this.unMovPrestamo[0].EQUIPO_ID;
      this.datosMovPrestamo.FECHA_REGISTRO = this.unMovPrestamo[0].FECHA_REGISTRO;
      this.datosMovPrestamo.FECHA_DEVOLUCION = this.unMovPrestamo[0].FECHA_DEVOLUCION;
      this.datosMovPrestamo.FECHA_ENTREGA = this.unMovPrestamo[0].FECHA_ENTREGA;

      console.log(this.unMovPrestamo);
    }, error => {
      console.log(error);
    });

  }
  
  cancelarMovPrestamo(){
    this.navCtrl.pop();   
  }

  showAlert(titulo: string, contenido: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: contenido,
      buttons: ['OK']
    });
    alert.present();
  }

  mostrarToast(mensaje: string, tiempo?: number) {
    if (!tiempo) {
      tiempo = 1500;
    }
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: tiempo
    });
    toast.present();
  }

  doEliminarMovPrestamo() {
    if (this.datosMovPrestamo.MOV_PRESTAMO_ID > 0
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
/*
      utilizaCrudMovPrestamo(unaOperacion: any,
        unCodigo_mov_prestamo:any,
        unCodigo_prestamo:any,
        unCodigo_equipo:any,
        unaFecha_registro:any,
        unaFecha_devolucion:any,
        unaFecha_entrega:any)
*/
      this.con.utilizaCrudMovPrestamo('B',
      this.datosMovPrestamo.MOV_PRESTAMO_ID,
      this.datosMovPrestamo.PRESTAMO_ID,
      this.datosMovPrestamo.EQUIPO_ID,
      this.datosMovPrestamo.FECHA_REGISTRO,
      this.datosMovPrestamo.FECHA_DEVOLUCION,
      this.datosMovPrestamo.FECHA_ENTREGA).subscribe(res => {


          if (res == "Elimino") {

            this.mostrarToast('Registro Eliminado...', 2000);

            this.cancelarMovPrestamo();
          }
          else {
            this.showAlert('Error', 'No se pudo Eliminar el Registro. ' + res);

            this.cancelarMovPrestamo();
           // this.mostrarToast('Registro No pudo ser Eliminado...', 2000);
          }

        }, error => {
          console.log(error);
          this.showAlert('Error', 'No puedo Eliminar' + error);
        });
    }
    else {
      console.log('No Puedo Eliminar');
      this.showAlert('Error', 'No puedo Eliminar');
    }

  }

  eliminarMovPrestamo() {
    let confirm = this.alertCtrl.create({
      title: '¿Que deseas hacer?',
      message: `Eliminar el Equipo <b>"${this.datosMovPrestamo.MOV_PRESTAMO_ID}"</b>`,
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.doEliminarMovPrestamo();
          }
        },
        {
          text: 'No',
          handler: () => {
            this.cancelarMovPrestamo();
          }
        }

      ]
    });
    confirm.present();

  }


  insertarMovPrestamo() {
    //this.datosEquipo.DESCRIPCION.length > 0

    if (this.datosMovPrestamo.FECHA_DEVOLUCION !== null &&
      this.datosMovPrestamo.FECHA_REGISTRO !== null &&
      this.datosMovPrestamo.PRESTAMO_ID > 0 &&
      this.datosMovPrestamo.EQUIPO_ID > 0
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.con.utilizaCrudMovPrestamo('I',
      this.datosMovPrestamo.MOV_PRESTAMO_ID,
      this.datosMovPrestamo.PRESTAMO_ID,
      this.datosMovPrestamo.EQUIPO_ID,
      this.datosMovPrestamo.FECHA_REGISTRO,
      this.datosMovPrestamo.FECHA_DEVOLUCION,
      this.datosMovPrestamo.FECHA_ENTREGA).subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          console.log(res);

          if (res == "Inserto") {

            this.mostrarToast('Registro Insertado', 2000);

            this.cancelarMovPrestamo();
          }
          else {
            this.mostrarToast('Registro  No Insertado', 2000);
            this.showAlert('Error', res);
          }

        }, error => {
          console.log(error);
        });
    }
    else {
      console.log('No Puedo Insertar');
      this.showAlert('Error', 'Faltan Datos');
    }
  }
 
  actualizarMovPrestamo() {
    if (this.datosMovPrestamo.FECHA_DEVOLUCION !== null &&
      this.datosMovPrestamo.FECHA_REGISTRO !== null &&
      this.datosMovPrestamo.MOV_PRESTAMO_ID > 0 &&
      this.datosMovPrestamo.PRESTAMO_ID > 0 &&
      this.datosMovPrestamo.EQUIPO_ID > 0
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.con.utilizaCrudMovPrestamo('A',
      this.datosMovPrestamo.MOV_PRESTAMO_ID,
      this.datosMovPrestamo.PRESTAMO_ID,
      this.datosMovPrestamo.EQUIPO_ID,
      this.datosMovPrestamo.FECHA_REGISTRO,
      this.datosMovPrestamo.FECHA_DEVOLUCION,
      this.datosMovPrestamo.FECHA_ENTREGA).subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          console.log(res);

          //this.param = res;


          if (res == "Actualizo") {

            this.mostrarToast('Registro Actualizado...', 2000);

            this.cancelarMovPrestamo();
          }
          else {
            this.mostrarToast('Registro No pudo ser Actualizado...', 2000);
          }

        }, error => {
          console.log(error);
        });
    }
    else {
      console.log('No Puedo Actualizar');
      this.showAlert('Error', 'Faltan Datos');
    }

  }
  


}
