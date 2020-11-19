import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SignupRequest } from 'src/app/model/signup-request';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupRequest: SignupRequest;
  isError: boolean;
  message: string;




  constructor(private router: Router, private authService: AuthService) { 
    this.signupRequest = {
      userName: '',
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
} 
this.createReactiveForm();
  }


  createReactiveForm() {
    this.signupForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
  })
}

signup(){

  let userNameOriginal: string = this.signupForm.get("userName").value;
  this.signupRequest.password = this.signupForm.get("password").value;
  let emailOriginal: string = this.signupForm.get("email").value;
  
  
  this.signupRequest.userName = userNameOriginal.toLowerCase();
  this.signupRequest.email = emailOriginal.toLowerCase();
  this.authService.signup(this.signupRequest).subscribe(
    data => {
      this.isError = false;
      this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
    }, error=> {
      this.isError = true;
      throwError(error);
    }
    
    
    
  )
  
}

}
