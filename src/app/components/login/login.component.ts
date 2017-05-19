import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private service:ChatService) { }

  ngOnInit() {
  }

  login(proveedor:string){
    this.service.login(proveedor);
  }

}
