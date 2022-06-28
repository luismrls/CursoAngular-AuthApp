import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  miFormulario: FormGroup = this.formBuilder.group({
    name: ['test 1', [Validators.required]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  singUp() {
    console.log(this.miFormulario.value);
    const { name, email, password } = this.miFormulario.value;

    this.authService.singUp(name, email, password)
      .subscribe( ok => {
        if(ok === true){
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error de registro', ok, 'error');
        }
      });
  }

}
