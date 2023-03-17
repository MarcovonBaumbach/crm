import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crm';
  subPage: string = 'Dashboard';

  changeHeader(param: string) {
    this.subPage = param;
  }
}
