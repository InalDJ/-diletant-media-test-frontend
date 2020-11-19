import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import  M  from 'materialize-css';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;
  keyword: string;
  searchForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.keyword = "";
    
   }

  ngOnInit(): void {

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();


    this.searchForm = new FormGroup({
      keyword: new FormControl(null, Validators.required)
    }) 

  }

  ngAfterViewInit():void{
     document.addEventListener('DOMContentLoaded', function() {
    var optionsSideNav = {
     
    }
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, optionsSideNav);
});

  }
 
  

  search(){
    this.keyword = this.searchForm.get('keyword').value;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['search', this.keyword]);
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

 
}
