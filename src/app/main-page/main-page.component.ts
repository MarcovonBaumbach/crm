import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  dashboardSelected = true;
  userSelected = false;
  dealsSelected = false;
  newsSelected = false;
  subPage: string = 'Dashboard';

  /**
   * change the header according to the selected page
   * @param param 
   */
  changeHeader(param: string) {
    this.subPage = param;
    this.dashboardSelected = false;
    this.userSelected = false;
    this.dealsSelected = false;
    this.newsSelected = false;
    if(param == 'Dashboard') {
      this.dashboardSelected = true; 
    } else if(param == 'User') {
      this.userSelected = true;
    } else if(param == 'Deals') {
      this.dealsSelected = true;
    } else if(param == 'News') {
      this.newsSelected = true;
    }
  }
}
