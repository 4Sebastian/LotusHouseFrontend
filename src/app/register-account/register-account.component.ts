import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent implements OnInit {

  constructor(private page: Page) {
    page.actionBarHidden = true;
   }

  ngOnInit(): void {
  }

}
