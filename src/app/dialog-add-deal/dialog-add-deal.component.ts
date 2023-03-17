import { Component } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection } from '@firebase/firestore';
import { Deal } from 'src/models/deal.class';


@Component({
  selector: 'app-dialog-add-deal',
  templateUrl: './dialog-add-deal.component.html',
  styleUrls: ['./dialog-add-deal.component.scss']
})

export class DialogAddDealComponent {
  deal = new Deal();
  users = collection(this.firestore, 'users');
  users$ = collectionData(this.users);
  userEmail = '';
  userFirstName = '';
  userLastName = '';
  coll: any;
  loading = false;
  showButton = true;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddDealComponent>) {
    this.coll = collection(this.firestore, 'deals');
  }

  selectUser(user) {
    this.userEmail = user.email;
    this.userFirstName = user.firstName;
    this.userLastName = user.lastName;
    this.showButton = false;
    console.log(user);
  }

  saveDeal() {
    this.loading = true;
    console.log(this.deal);

    addDoc(this.coll, this.deal.toJSON()).then((result: any) => {
      console.log('neuer Deal', result);
      this.dialogRef.close();
    });
    this.loading = false;
  }
}
