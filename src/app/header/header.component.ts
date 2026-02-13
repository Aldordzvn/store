import { Component } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faBars, faArrowLeft, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuIcon = faBars;
  backIcon = faArrowLeft;
  cartIcon = faShoppingCart;
  menuToggle : boolean = false;
  hasInteracted : boolean = false;

  constructor(private route: Router){}

  openMenu(){
    this.menuToggle = !this.menuToggle;
    this.hasInteracted = true;
    if(this.menuToggle){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = '';
    }
  }

}
