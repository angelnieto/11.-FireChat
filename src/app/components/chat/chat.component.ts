import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    mensaje:string = "";
    elemento:any;
        
  constructor(private service:ChatService) {
      
      this.service.cargarMensajes().subscribe(() => {
          console.log('Mensajes cargados...');
                 
          setTimeout(() => this.elemento.scrollTop = this.elemento.scrollHeight, 1);
      })
      
  }

  ngOnInit() {
      this.elemento = document.getElementById("app-mensajes");
  }

  enviar(){
      
      if(this.mensaje !== ''){
          this.service.enviarMensaje(this.mensaje).then( () => console.log("Enviado")).catch((error) => console.log(error));
          this.mensaje="";
      }
      
  }
}
