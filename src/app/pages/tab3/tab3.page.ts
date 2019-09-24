import { Component } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


constructor(public Localservice: LocalService, public iab: InAppBrowser, public toastController: ToastController,
            public actionSheetController: ActionSheetController, public socialSharing: SocialSharing) {}

 // REDIRECCIONAR AL USUARIO A LA PAGINA WEB DE LA NOTICIA
 url(noticia) {
  console.log('noticia', noticia);
  const browser = this.iab.create(noticia, '_system');
  }

  // CARGAR TOAST
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Noticia eliminada correctamente',
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
      text: 'Eliminar Favorito',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Noticia Eliminada', noticias);
        // eliminar en el local storage0
        this.Localservice.borrarNoticias(noticias);
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
