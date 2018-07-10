import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';
import { Equipo } from '../../models/modelo_equipos';
import { Events } from 'ionic-angular'

/**
 * Generated class for the EquiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:"equipos", segment:"equipos"})
@Component({
  selector: 'page-equipos',
  templateUrl: 'equipos.html',
})
export class EquiposPage {

  equipo:any;
  equipoBD:any;
  datos_equipo = {} as Equipo;
  unaAccion:any;


  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public con:ProveedorUsuarioProvider, 
            public conf_usuario:ProveedorSessionProvider,
            public toastCtrl: ToastController,
            public alertCtrl: AlertController,
            public events:Events) {

              this.equipo = this.navParams.get("unequip");
              this.unaAccion = this.navParams.get("una_accion");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquiposPage');

    if(this.unaAccion === "ACTUALIZAR"){

      this.llamaunequipo();

    }else if(this.unaAccion === "CREAR"){

      this.datos_equipo.EQUIPO_ID = -1;
      this.datos_equipo.DESCRIPCION = '';
      this.datos_equipo.REFERENCIA = '';
      this.datos_equipo.TIPO_EQUIPO_ID = 0;
      this.datos_equipo.SERIAL= '';
      this.datos_equipo.ESTADO = '';
      this.datos_equipo.FECHA_REG = null;
      this.datos_equipo.FOTO = '';

    }


  }

  llamaunequipo(){
    this.con.traerUnEquipo(this.equipo.EQUIPO_ID).subscribe(res => {
      
      this.equipoBD=res;

      this.datos_equipo.EQUIPO_ID             = this.equipoBD[0].EQUIPO_ID;
      this.datos_equipo.DESCRIPCION           = this.equipoBD[0].DESC_EQUIPO;
      this.datos_equipo.REFERENCIA            = this.equipoBD[0].REFERENCIA;
      this.datos_equipo.TIPO_EQUIPO_ID        = this.equipoBD[0].TIPO_EQUIPO_ID;
      this.datos_equipo.SERIAL                = this.equipoBD[0].SERIAL;
      this.datos_equipo.ESTADO                = this.equipoBD[0].ESTADO;
      this.datos_equipo.FECHA_REG             = this.equipoBD[0].FECHA_REG;
      this.datos_equipo.FOTO                  = this.equipoBD[0].FOTO;

      
    }, error => {
      console.log(error);
    });
  }

  consultaEquipo(){

    this.con.traerUnEquipo(this.equipo.EQUIPO_ID).subscribe(resultado => {

      console.log(resultado);
      console.log(resultado.length);
      this.equipoBD = resultado;

      this.datos_equipo.EQUIPO_ID = this.equipoBD[0].EQUIPO_ID;
      this.datos_equipo.DESCRIPCION = this.equipoBD[0].DESCRIPCION;
      this.datos_equipo.REFERENCIA = this.equipoBD[0].REFERENCIA;
      this.datos_equipo.TIPO_EQUIPO_ID = this.equipoBD[0].TIPO_EQUIPO_ID;
      this.datos_equipo.SERIAL= this.equipoBD[0].SERIAL;
      this.datos_equipo.ESTADO = this.equipoBD[0].ESTADO;
      this.datos_equipo.FECHA_REG = this.equipoBD[0].FECHA_REG;
      

     }, error =>{

      console.log(error);

     });
  }



  insertarEquipo() {

    if (this.datos_equipo.DESCRIPCION !== '' &&
      this.datos_equipo.REFERENCIA !== '' &&
      this.datos_equipo.SERIAL !== '' &&
      this.datos_equipo.TIPO_EQUIPO_ID > 0
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.con.utilizaCrudEquipo('I',
        this.datos_equipo.EQUIPO_ID,
        this.datos_equipo.DESCRIPCION,
        this.datos_equipo.REFERENCIA,
        this.datos_equipo.TIPO_EQUIPO_ID,
        this.datos_equipo.SERIAL,
        this.datos_equipo.ESTADO).subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON
          console.log('Inserta registro ws: ');
          console.log(res => res.json());

          if (res == "inserto registro") {

            this.mostrarToast('Registro Insertado', 2000);

            this.cancelarEquipo();
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

  actualizarEquipo(){

    if (this.datos_equipo.DESCRIPCION !== '' &&
      this.datos_equipo.REFERENCIA !== '' &&
      this.datos_equipo.SERIAL !== '' &&
      this.datos_equipo.TIPO_EQUIPO_ID > 0
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.con.utilizaCrudEquipo('A',
        this.datos_equipo.EQUIPO_ID,
        this.datos_equipo.DESCRIPCION,
        this.datos_equipo.REFERENCIA,
        this.datos_equipo.TIPO_EQUIPO_ID,
        this.datos_equipo.SERIAL,
        this.datos_equipo.ESTADO).subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          if (res == "Actualizo registro") {

            this.mostrarToast('Registro Actualizado', 2000);

            this.cancelarEquipo();
          }
          else {
            this.mostrarToast('Registro  No Actualizado', 2000);
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

  eliminarEquipo(){

    if (this.datos_equipo.DESCRIPCION !== '' &&
    this.datos_equipo.REFERENCIA !== '' &&
    this.datos_equipo.SERIAL !== '' &&
    this.datos_equipo.TIPO_EQUIPO_ID > 0
  ) {

    //Aqui puedo realizar la insercion con los
    //datos del la Pagina
    this.con.utilizaCrudEquipo('B',
      this.datos_equipo.EQUIPO_ID,
      this.datos_equipo.DESCRIPCION,
      this.datos_equipo.REFERENCIA,
      this.datos_equipo.TIPO_EQUIPO_ID,
      this.datos_equipo.SERIAL,
      this.datos_equipo.ESTADO).subscribe(res => {
        //Aqui es resultado es cargado a la variable como JSON

        if (res == "Elimino registro") {

          this.mostrarToast('Registro eliminado', 2000);

          this.cancelarEquipo();
        }
        else {
          this.mostrarToast('Registro  No Eliminado', 2000);
        }

      }, error => {
        console.log(error);
      });
  }
  else {
    console.log('No eliminar');
    this.showAlert('Error', 'Faltan Datos');
  }


  }



  cancelarEquipo() {
    this.events.publish('reloadConEquipos');
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
