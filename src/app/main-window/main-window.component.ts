import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page';
// import { Page } from '@nativescript/core/ui';
import { EventData } from '@nativescript/core/data/observable'
import { LayoutBase } from '@nativescript/core/ui/layouts/layout-base';
import { View } from '@nativescript/core/ui/core/view';
import { CubicBezierAnimationCurve } from '@nativescript/core/ui/animation';
// import { CubicBezierAnimationCurve } from '@nativescript/core/ui/animation';
import { IssueService } from '../issue.service';
import { DatePicker } from '@nativescript/core/ui/date-picker';
// import { DatePicker } from '@nativescript/core/ui';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {

  //month: number = this.issueService.getMonth();
  date: number = this.issueService.getDate();
  year: number = this.issueService.getYear();
  month: number = this.issueService.getMonth();
  datePicker = new DatePicker();

  constructor(private page: Page, private issueService: IssueService){
    page.actionBarHidden = true;
  }

  ngOnInit() {
  }

  isLoading(){
    return this.issueService.isLoading();
    //return true;
  }

  onToggleLoaded(args: EventData){
    const lb = <LayoutBase>args.object;

    const toggler = <View>lb.page.getViewById('toggler')
    console.log('here');

    lb.eachChildView((v: View) => {
      if(v.className === 'toggler'){
        return;
      }
      v.on('tap', (a: EventData) => {
        const lbl = <View>a.object;
        const loc = lbl.getLocationRelativeTo(lb);
        //toggler.translateX = loc.x;
        toggler.animate({
          translate: { x: loc.x, y: 0 },
          duration: 450,
          curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1)
        });
      });

      return true;
    });

  }

  onTopBarLoaded(args: EventData){
    const lb = <LayoutBase>args.object;

    const toggler = <View>lb.page.getViewById('togglerTop')
    console.log('here2');

    lb.eachChildView((v: View) => {
      if(v.className === 'togglerTop' || v.className === 'dateLbl'){
        return;
      }
      
      v.on('tap', (a: EventData) => {
        const lbl = <View>a.object;
        const loc = lbl.getLocationRelativeTo(lb);

        toggler.translateX = loc.x;

        toggler.animate({
          opacity: 1,
          duration: 50,
          curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1)
        }).then(() =>{
          toggler.animate({
            opacity: 0,
            duration: 300,
            curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1)
          });
        });
      });
      
      return true;
    });

  }

  previousDate(){
    this.issueService.previousDate();
    this.updateDate();
  }

  nextDate(){
    this.issueService.nextDate();
    this.updateDate();
  }

  updateDate(){
    this.date = this.issueService.getDate();
    this.month = this.issueService.getMonth();
    this.year = this.issueService.getYear();
    this.issueService.forceReload();
  }

}
