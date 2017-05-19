import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {  AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

    chats: FirebaseListObservable<any[]>;
    usuario:any = {}

    constructor(private db: AngularFireDatabase, private afAuth:AngularFireAuth) {
        if(localStorage.getItem('usuario')){
          this.usuario = JSON.parse(localStorage.getItem('usuario'));
        }else{
          this.usuario = null;
        }
        console.log(this.usuario);
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
                  nombre : this.usuario.user.displayName,
                  mensaje : texto,
                  uid : this.usuario.user.uid
          }

          return this.chats.push(mensaje);
      }

      login(proveedor:string){
        let servicioAutenticacion:any;
        if(proveedor == 'google'){
          servicioAutenticacion = new firebase.auth.GoogleAuthProvider();
        }else if(proveedor == 'twitter') {
          servicioAutenticacion = new firebase.auth.TwitterAuthProvider();
        }

        this.afAuth.auth.signInWithPopup(servicioAutenticacion)
        .then(data => {
          this.usuario = data;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
        });
      }

      logout(){
        this.usuario = null;
        localStorage.removeItem('usuario');
        this.afAuth.auth.signOut();
      }

}
