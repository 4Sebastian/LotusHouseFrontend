import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-shelter-pick',
  templateUrl: './shelter-pick.component.html',
  styleUrls: ['./shelter-pick.component.css']
})
export class ShelterPickComponent implements OnInit {

  constructor(private page: Page, private issueService: IssueService) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }

}
