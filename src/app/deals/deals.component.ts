import { Component } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
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

  constructor(public dialog: MatDialog, private firestore: Firestore, private dataService: DataService) {
    this.coll = collection(this.firestore, 'deals');
    this.deals$ = collectionData(this.coll, { idField: 'id'});
    this.doneColl = collection(this.firestore, 'done-deals');
    this.doneDeals$ = collectionData(this.doneColl, { idField: 'id'});
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
    addDoc(this.doneColl, doneDeal.toJSON());
    deleteDoc(doc(this.firestore, 'deals', dealId));
  }

  deleteDeal(collection: string, dealId: string) {
    deleteDoc(doc(this.firestore, collection, dealId));
  }
}
