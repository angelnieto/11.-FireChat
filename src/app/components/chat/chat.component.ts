import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    mensaje:string = "";
    
  constructor(private service:ChatService) {
      
      this.service.cargarMensajes().subscribe(() => {
          console.log('Mensajes cargados...');
      })
      
  }

  ngOnInit() {
  }

  enviar(){
      
      if(this.mensaje !== ''){
          this.service.enviarMensaje(this.mensaje).then( () => console.log("Enviado")).catch((error) => console.log(error));
      }
      
  }
}
