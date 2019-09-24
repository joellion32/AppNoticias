import { Component, ViewChild } from '@angular/core';
import { IonSegment, ToastController } from '@ionic/angular';
import { DataServiceService } from 'src/app/services/data-service.service';
import {  Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

@ViewChild(IonSegment) segment: IonSegment;


categorias = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
   // variables
   noticias: Article[] = [];

  constructor(private Dataservice: DataServiceService, private iab: InAppBrowser,
              public actionSheetController: ActionSheetController, private socialSharing: SocialSharing,
              public Localservice: LocalService, public toastController: ToastController) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
   this.segment.value = this.categorias[0];
   console.log(this.categorias[0]);
   this.CargarNoticias(this.categorias[0]);
  }

  // cargar paginas de categorias
  loadData(event) {
  this.CargarNoticias(this.segment.value, event);
  }

// cargar noticias por categorias seleccionadas

  Categorias(event) {
    this.noticias = [];
    this.CargarNoticias(event.detail.value);
  }

  // cargar las noticias con la categoria general seleccionada
  CargarNoticias(categoria, event?) {
    this.Dataservice.NoticiasCategorias(categoria).subscribe(
      response => { this.noticias.push( ... response.articles);
        // comprobar si existe el evento
                    if (event) {
          event.target.complete();
         }
      },
      error => {console.log(error); }
      );
  }

  // REDIRECCIONAR AL USUARIO A LA PAGINA WEB DE LA NOTICIA
  url(noticia) {
    console.log('noticia', noticia);
    const browser = this.iab.create(noticia, '_system');
    }

    // CARGAR TOAST
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Noticia guardada correctamente',
      duration: 2000
    });
    toast.present();
  }

     // lanzar action sheet
 async lanzar(noticias) {
  const actionSheet = await this.actionSheetController.create({
    buttons: [{
      text: 'Compartir',
      icon: 'share',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Share clicked', noticias);
        // compartir via redes sociales
        this.socialSharing.share(noticias);
      }
    }, {
      text: 'Favorito',
      icon: 'star',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Favorito Clicket');
        // guardar en el local storage
        this.Localservice.guardarNoticias(noticias);
        this.presentToast();
      }
    }, {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}

}
