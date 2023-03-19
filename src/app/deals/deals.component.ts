import { Component } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Deal } from 'src/models/deal.class';
import { DataService } from '../data.service';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';
import { DialogEditDealComponent } from '../dialog-edit-deal/dialog-edit-deal.component';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent {
  deals$: Observable<any>;
  coll: any;
  doneDeals$: Observable<any>;
  doneColl: any;
  revenue: number;
  month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  d = new Date();
  currentMonth: string = this.month[this.d.getMonth()];
  revenueRef = doc(this.firestore, 'revenue', this.currentMonth);

  constructor(public dialog: MatDialog, private firestore: Firestore, private dataService: DataService) {
    this.coll = collection(this.firestore, 'deals');
    this.deals$ = collectionData(this.coll, { idField: 'id'});
    this.doneColl = collection(this.firestore, 'done-deals');
    this.doneDeals$ = collectionData(this.doneColl, { idField: 'id'});
    console.log(this.coll);
  }

  openDialog() {
    this.dialog.open(DialogAddDealComponent, {
      width: '300px'
    });
  }

  editDeal(deal, dealId: string) {
    this.dataService.deal = deal;
    this.dataService.dealId = dealId;
    this.dialog.open(DialogEditDealComponent, {
      width: '300px'
    });
  }

  dealDone(deal, dealId: string) {
    let doneDeal = new Deal(deal);
    this.increaseRevenue(doneDeal);
    this.setRevenueData();
    addDoc(this.doneColl, doneDeal.toJSON());
    deleteDoc(doc(this.firestore, 'deals', dealId));
  }

  deleteDeal(collection: string, dealId: string) {
    deleteDoc(doc(this.firestore, collection, dealId));
  }

  async increaseRevenue(doneDeal) {
    let docSnap = await getDoc(this.revenueRef);
    if (docSnap.exists()) {
      let document = docSnap.data();
      this.revenue = +(document['amount'] + doneDeal.amount);
    } else {
      this.revenue = +doneDeal.amount;
    }
    setDoc(this.revenueRef, {
      amount: this.revenue,
      month: this.currentMonth
    });
  }

  async setRevenueData() {
    this.dataService.amount = [];
    this.dataService.months = [];
    for (let i = 0; i < this.month.length; i++) {
      let revenueRef = doc(this.firestore, 'revenue', this.month[i]);
      let docSnap = await getDoc(revenueRef);
      if (docSnap.exists()) {
        let document = docSnap.data();
        this.dataService.amount.push(document['amount']);
        this.dataService.months.push(document['month']);
      }
    }
  }
}
