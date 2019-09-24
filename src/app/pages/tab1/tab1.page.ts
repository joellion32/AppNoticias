import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

constructor(private Dataservice: DataServiceService, private iab: InAppBrowser,
            public actionSheetController: ActionSheetController, private socialSharing: SocialSharing,
            public Localservice: LocalService, public toastController: ToastController) {}

  // variables
noticias: Article[] = [];

  ngOnInit() {
   this.CargarNoticias();
  }

  loadData(event) {
    this.CargarNoticias(event);
  }

  // para cargar las noticias: signo de interrogacion es que no es importante
  CargarNoticias( event? ) {
    this.Dataservice.NoticasTecnologia()
      response => {console.log(response);
      // comprobar si ya no hay paginas por mostrar y desactivar el infinite scroll
      // tslint:disable-next-line:align
      if (response.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;

      }
                   this.noticias.push( ...response.articles );
      // comprobar si existe el evento
      // tslint:disable-next-line:align
      if (event) {
        event.target.complete();
       }
      },

      // si da error
      error => {console.log(error); }
      );
      // comprobar si existe el evento

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
        console.log('Favorito Clicket', noticias);
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


}// cierre de la clase



