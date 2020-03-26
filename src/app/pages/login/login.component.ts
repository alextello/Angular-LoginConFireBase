import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();
  constructor(private http: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    } else {

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.http.login(this.usuario)
              .subscribe(resp => {
                console.log(resp);
                Swal.close();
                this.router.navigateByUrl('/home');
              }, (err) => {
                Swal.fire({
                  icon: 'error',
                  text: err.error.error.message,
                  title: 'Error al autenticar'
                });
              });
    }
  }

}
