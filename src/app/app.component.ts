import { Component } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crm';
  subPage: string = 'Dashboard';
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor(private firestore: Firestore, private dataservice: DataService) {
    this.getRevenueData();
  }

  changeHeader(param: string) {
    this.subPage = param;
  }

  async getRevenueData() {
    for (let i = 0; i < this.months.length; i++) {
      let revenueRef = doc(this.firestore, 'revenue', this.months[i]);
      let docSnap = await getDoc(revenueRef);
      if (docSnap.exists()) {
        let document = docSnap.data();
        this.dataservice.amount.push(document['amount']);
        this.dataservice.months.push(document['month']);
      }
    }
  }
}
