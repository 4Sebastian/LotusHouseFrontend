import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  deletedAccount = false;

  constructor() { }

  ngOnInit(): void {
  }

  hasDeletedAccount(){
    return this.deletedAccount;
  }

}
