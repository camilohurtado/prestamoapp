import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';
import { ProveedorSessionProvider } from '../../providers/proveedor-session/proveedor-session';
import { Equipo } from '../../models/modelo_equipos';

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
            public alertCtrl: AlertController) {

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
      console.log('respuesta de llamaunequipo camilo es una gueva ', res);
      this.equipoBD=res;

      this.datos_equipo.EQUIPO_ID             = this.equipo[0].EQUIPO_ID;
      this.datos_equipo.DESCRIPCION           = this.equipo[0].DESC_EQUIPO;
      this.datos_equipo.REFERENCIA            = this.equipo[0].REFERENCIA;
      this.datos_equipo.TIPO_EQUIPO_ID        = this.equipo[0].TIPO_EQUIPO_ID;
      this.datos_equipo.SERIAL                = this.equipo[0].SERIAL;
      this.datos_equipo.ESTADO                = this.equipo[0].ESTADO;
      this.datos_equipo.FECHA_REG             = this.equipo[0].FECHA_REG;
      this.datos_equipo.FOTO                  = this.equipo[0].FOTO;

      console.log(this.equipo);
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
    //this.datos_equipo.DESCRIPCION.length > 0

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
          console.log(res);

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



  cancelarEquipo() {
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
