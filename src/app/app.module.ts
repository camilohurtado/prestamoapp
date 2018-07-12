import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PresentacionPageModule } from '../pages/presentacion/presentacion.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ProveedorSessionProvider } from '../providers/proveedor-session/proveedor-session';
import { ProveedorUsuarioProvider } from '../providers/proveedor-usuario/proveedor-usuario';
import { HttpModule } from '@angular/http';
import { ServicesProvider } from '../providers/services/services';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    IonicModule.forRoot(MyApp),
    PresentacionPageModule,
    LoginPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProveedorSessionProvider,
    ProveedorUsuarioProvider,
    ServicesProvider
  ]
})
export class AppModule {}
