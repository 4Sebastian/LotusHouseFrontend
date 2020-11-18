import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private page: Page) {
    page.actionBarHidden = true;
   }

  ngOnInit(): void {
  }

}
