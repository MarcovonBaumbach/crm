import { Component } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
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
  amountDone: number;
  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  d = new Date();
  currentMonth: string = this.month[this.d.getMonth()];
  revenueRef = doc(this.firestore, 'revenue', this.currentMonth);
  dealDoneRef = doc(this.firestore, 'deals-done-graph', this.currentMonth);

  constructor(public dialog: MatDialog, private firestore: Firestore, private dataService: DataService) {
    this.coll = collection(this.firestore, 'deals');
    this.deals$ = collectionData(this.coll, { idField: 'id' });
    this.doneColl = collection(this.firestore, 'done-deals');
    this.doneDeals$ = collectionData(this.doneColl, { idField: 'id' });
  }

  /**
   * opens a dialog to ad a new deal
   */
  openDialog() {
    this.dialog.open(DialogAddDealComponent, {
      width: '300px'
    });
  }

  /**
   * opens a dialog to edit the selected deal
   * @param {any} deal 
   * @param {string} dealId - id of the document on firestore
   */
  editDeal(deal, dealId: string) {
    this.dataService.deal = deal;
    this.dataService.dealId = dealId;
    this.dialog.open(DialogEditDealComponent, {
      width: '300px'
    });
  }

  /**
   * moves the selected deal into the deal done category
   * @param {any} deal 
   * @param dealId - id of the document on firestore
   */
  dealDone(deal, dealId: string) {
    let doneDeal = new Deal(deal);
    this.increaseRevenue(doneDeal);
    this.increaseDoneDeal();
    this.setRevenueData();
    this.setDealCompletedData();
    addDoc(this.doneColl, doneDeal.toJSON());
    deleteDoc(doc(this.firestore, 'deals', dealId));
  }

  /**
   * deletes the deal from deals collection on firestore
   * @param collection - the selected collection on firestore
   * @param dealId - id of the document on firestore 
   */
  deleteDeal(collection: string, dealId: string) {
    deleteDoc(doc(this.firestore, collection, dealId));
  }

  /**
   * increase the monthly revenue for the revenue graph, when a deal is done
   * @param {any} doneDeal 
   */
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

  /**
   * increase the monthly amount of done deals for activities completed graph, when a deal is done
   */
  async increaseDoneDeal() {
    let docSnap = await getDoc(this.dealDoneRef);
    if (docSnap.exists()) {
      let document = docSnap.data();
      this.amountDone = +(document['amountDone'] + 1);
    } else {
      this.amountDone = 1;
    }
    setDoc(this.dealDoneRef, {
      amountDone: this.amountDone,
      month: this.currentMonth
    });
  }

  /**
   * save revenue data on dataservice for revenue graph
   */
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

  /**
   * save deal done data on dataservice for activities completed graph
   */
  async setDealCompletedData() {
    this.dataService.amountDone = [];
    this.dataService.monthDealDone = [];
    for (let i = 0; i < this.month.length; i++) {
      let dealDoneRef = doc(this.firestore, 'deals-done-graph', this.month[i]);
      let docSnap = await getDoc(dealDoneRef);
      if (docSnap.exists()) {
        let document = docSnap.data();
        this.dataService.amountDone.push(document['amountDone']);
        this.dataService.monthDealDone.push(document['month']);
      }
    }
  }
}
