import { Component } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent {
  deals$: Observable<any>;
  coll: any;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.coll = collection(this.firestore, 'deals');
    this.deals$ = collectionData(this.coll, { idField: 'id'});
  }

  openDialog() {
    this.dialog.open(DialogAddDealComponent);
  }
}
