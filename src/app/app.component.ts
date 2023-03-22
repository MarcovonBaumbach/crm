import { Component } from '@angular/core';
import { collection, Firestore, getDoc, getDocs } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crm';

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
    this.setDealData();
    this.setDealDoneData();
  }

  async getRevenueData() {
    this.dataservice.amount = [];
    this.dataservice.months = [];
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

  async setDealData() {
    this.dataservice.nameDealsStarted = [];
    this.dataservice.amountDealsStarted = [];
    let dealRef = collection(this.firestore, 'deals-started');
    let querySnapshot = await getDocs(dealRef);
    querySnapshot.forEach((doc) => {
      let document = doc.data();
      this.dataservice.amountDealsStarted.push(document['amountDealsStarted']);
      this.dataservice.nameDealsStarted.push(document['nameDealsStarted']);
    });
  }

  async setDealDoneData() {
    this.dataservice.monthDealDone = [];
    this.dataservice.amountDone = [];
    for (let i = 0; i < this.months.length; i++) {
      let dealRef = doc(this.firestore, 'deals-done-graph', this.months[i]);
      let docSnap = await getDoc(dealRef);
      if (docSnap.exists()) {
        let document = docSnap.data();
        this.dataservice.amountDone.push(document['amountDone']);
        this.dataservice.monthDealDone.push(document['month']);
      }
    }
  }
}
