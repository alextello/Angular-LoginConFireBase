import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();
  constructor(private http: AuthService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.http.login(this.usuario)
              .subscribe(resp => {
                console.log(resp);
              }, (err) => {
                console.log(err.error.error.message);
              });
    }
  }

}
