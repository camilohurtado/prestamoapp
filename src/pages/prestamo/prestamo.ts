import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Prestamo } from '../../models/modelo_prestamo';
import {  ProveedorUsuarioProvider} from '../../providers/proveedor-usuario/proveedor-usuario';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the PrestamoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'prestamo',
  segment: 'prestamo'
})

@Component({
  selector: 'page-prestamo',
  templateUrl: 'prestamo.html',
})
export class PrestamoPage {
  //Esta variable es un objeto para mastrarlo en el Formulario
  datosPrestamo = {} as Prestamo;

  unaAccion: any;

  //Esta variable es el codigo del Prestamo que voy a cargar
  unCodigoPrestamo: any;

  //Esta variable va a cargar los datos del Provider, como JSON
  unPrestamo: any;


  nombre_usuario: any;
  codigo_usuario: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private con: ProveedorUsuarioProvider,
    private session: ProveedorSessionProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {

    //Aqui asigno el valor del Equipo pasado como parametro
    //Desde otro formulario  
    this.unCodigoPrestamo = this.navParams.get("codigo_prestamo");
    this.unaAccion = this.navParams.get("una_accion");

    this.nombre_usuario = this.session.getUsuario("NOMBRE");
    this.codigo_usuario = this.session.getUsuario("USUARIO_ID");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestamoPage');
    this.ajustaPrestamo();
  }

  ajustaPrestamo() {
    if (this.unaAccion == 'ACTUALIZAR') {
      this.consultaPrestamo();
    }
    else if (this.unaAccion == 'CREAR') {
      this.inicializaPrestamo();
    }
  }

  inicializaPrestamo() {
    this.datosPrestamo.PRESTAMO_ID = -1;
    this.datosPrestamo.OBSERVACION = '';
    this.datosPrestamo.FECHA_HORA = null;
    this.datosPrestamo.USU_PREST_ID = this.codigo_usuario;
    this.datosPrestamo.ESCENARIO_ID = 1;
    this.datosPrestamo.ESTADO_PREST = "A";
    this.datosPrestamo.USU_ENTRE_ID = this.codigo_usuario;
    this.datosPrestamo.HORA_INICIO = null;
    this.datosPrestamo.HORA_FIN = null;
  }

  consultaPrestamo() {
    //Aqui consumo la URL de provider, con el codigo del Equipo
    this.con.consultaPrestamo(this.unCodigoPrestamo).subscribe(res => {
      //Aqui es resultado es cargado a la variable como JSON
      this.unPrestamo = res;

      this.datosPrestamo.PRESTAMO_ID  = this.unPrestamo[0].PRESTAMO_ID;
      this.datosPrestamo.OBSERVACION  = this.unPrestamo[0].OBSERVACION;
      this.datosPrestamo.FECHA_HORA   = this.unPrestamo[0].FECHA_HORA;
      this.datosPrestamo.USU_PREST_ID = this.unPrestamo[0].USU_PREST_ID;
      this.datosPrestamo.ESCENARIO_ID = this.unPrestamo[0].ESCENARIO_ID;
      this.datosPrestamo.ESTADO_PREST = this.unPrestamo[0].ESTADO_PREST;
      this.datosPrestamo.USU_ENTRE_ID = this.unPrestamo[0].USU_ENTRE_ID;
      this.datosPrestamo.HORA_INICIO  = this.unPrestamo[0].HORA_INICIO;
      this.datosPrestamo.HORA_FIN     = this.unPrestamo[0].HORA_HORA_FIN;


      console.log(this.unPrestamo);
    }, error => {
      console.log(error);
    });

  }


  insertarPrestamo() {
    //this.datosEquipo.DESCRIPCION.length > 0

    if (this.datosPrestamo.OBSERVACION !== '' &&
      this.datosPrestamo.FECHA_HORA !== null &&
      this.datosPrestamo.ESCENARIO_ID > 0 &&
      this.datosPrestamo.USU_ENTRE_ID > 0 &&
      this.datosPrestamo.USU_PREST_ID > 0
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.con.utilizaCrudPrestamo('I',
        this.datosPrestamo.PRESTAMO_ID,
        this.datosPrestamo.OBSERVACION,
        this.datosPrestamo.FECHA_HORA,
        this.datosPrestamo.USU_PREST_ID,
        this.datosPrestamo.ESCENARIO_ID,
        this.datosPrestamo.ESTADO_PREST,
        this.datosPrestamo.USU_ENTRE_ID,
        this.datosPrestamo.HORA_INICIO,
        this.datosPrestamo.HORA_FIN).subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          console.log(res);

          if (res == "Inserto") {

            this.mostrarToast('Registro Insertado', 2000);

            this.cancelarPrestamo();
          }
          else {
            this.mostrarToast('Registro  No Insertado', 2000);
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


  doEliminarPrestamo() {
    if (this.datosPrestamo.PRESTAMO_ID > 0
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.con.utilizaCrudPrestamo('B',
      this.datosPrestamo.PRESTAMO_ID,
      this.datosPrestamo.OBSERVACION,
      this.datosPrestamo.FECHA_HORA,
      this.datosPrestamo.USU_PREST_ID,
      this.datosPrestamo.ESCENARIO_ID,
      this.datosPrestamo.ESTADO_PREST,
      this.datosPrestamo.USU_ENTRE_ID,
      this.datosPrestamo.HORA_INICIO,
      this.datosPrestamo.HORA_FIN).subscribe(res => {


          if (res == "Elimino") {

            this.mostrarToast('Registro Eliminado...', 2000);

            this.cancelarPrestamo();
          }
          else {
            this.showAlert('Error', 'No se pudo Eliminar el Registro. ' + res);

            this.cancelarPrestamo();
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

  eliminarPrestamo() {
    let confirm = this.alertCtrl.create({
      title: '¿Que deseas hacer?',
      message: `Eliminar el Equipo <b>"${this.datosPrestamo.PRESTAMO_ID}"</b>`,
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.doEliminarPrestamo();
          }
        },
        {
          text: 'No',
          handler: () => {
            this.cancelarPrestamo();
          }
        }

      ]
    });
    confirm.present();

  }


  actualizarPrestamo() {
    if (this.datosPrestamo.OBSERVACION !== '' &&
    this.datosPrestamo.FECHA_HORA !== null &&
    this.datosPrestamo.ESCENARIO_ID > 0 &&
    this.datosPrestamo.USU_ENTRE_ID > 0 &&
    this.datosPrestamo.USU_PREST_ID > 0
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.con.utilizaCrudPrestamo('A',
      this.datosPrestamo.PRESTAMO_ID,
      this.datosPrestamo.OBSERVACION,
      this.datosPrestamo.FECHA_HORA,
      this.datosPrestamo.USU_PREST_ID,
      this.datosPrestamo.ESCENARIO_ID,
      this.datosPrestamo.ESTADO_PREST,
      this.datosPrestamo.USU_ENTRE_ID,
      this.datosPrestamo.HORA_INICIO,
      this.datosPrestamo.HORA_FIN).subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          console.log(res);

          //this.param = res;


          if (res == "Actualizo") {

            this.mostrarToast('Registro Actualizado...', 2000);

            this.cancelarPrestamo();
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

  cancelarPrestamo() {
    this.navCtrl.pop();
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


  showAlert(titulo: string, contenido: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: contenido,
      buttons: ['OK']
    });
    alert.present();
  }

}
