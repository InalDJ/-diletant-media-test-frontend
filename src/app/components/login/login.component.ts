import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

import { LoginRequest } from 'src/app/model/login-request';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  

  loginForm: FormGroup;
  loginRequest: LoginRequest;
  isError: boolean;
  registered: boolean;


  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.loginRequest = {
      userName: '',
      password: ''
    }
   }

  ngOnInit(): void {
  if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
} 

  this.createReactiveForm();

  this.route.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.registered = true;
        }
      });
  
  }

 
 
  createReactiveForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
  })
}

login(){
  let userNameOriginal: string = this.loginForm.get("userName").value;
  this.loginRequest.password = this.loginForm.get("password").value;
  this.loginRequest.userName = userNameOriginal.toLowerCase();
  
  this.authService.login(this.loginRequest).subscribe(data => {
    this.isError = false;
    this.router.navigateByUrl('');
  }, error => {
    this.isError = true;
    throwError(error);
  });
}



}
