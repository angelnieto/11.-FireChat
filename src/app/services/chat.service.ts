import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ChatService {
    
    chats: FirebaseListObservable<any[]>;

    constructor(private db: AngularFireDatabase) {
        //this.chats = db.list('/chats');
      }
    
    cargarMensajes(){
        this.chats = this.db.list('chats',{
            query:{
                limitToLast:20,
                orderByKey:true
            }
        })
        
        return this.chats;
    }
      
      enviarMensaje(texto:string){
          let mensaje:Message = {
                  nombre : "David",
                  mensaje : texto
          }
      
          return this.chats.push(mensaje);
      }

}
