import { Component } from '@angular/core';
import { collection, collectionData, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { doc } from '@firebase/firestore';
import { Deal } from 'src/models/deal.class';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dialog-edit-deal',
  templateUrl: './dialog-edit-deal.component.html',
  styleUrls: ['./dialog-edit-deal.component.scss']
})
export class DialogEditDealComponent {
  deal = new Deal(this.dataService.deal);
  dealId = this.dataService.dealId;
  users = collection(this.firestore, 'users');
  users$ = collectionData(this.users);
  userEmail = this.deal.email;
  userFirstName = this.deal.firstName;
  userLastName = this.deal.lastName;
  coll: any;
  loading = false;
  showButton = true;
  inputMissing = false;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditDealComponent>, private dataService: DataService) {
    this.coll = collection(this.firestore, 'deals');
  }

  selectUser(user) {
    this.userEmail = user.email;
    this.userFirstName = user.firstName;
    this.userLastName = user.lastName;
    this.showButton = false;
  }

  async saveDeal() {
    if (this.userEmail != '' && this.deal.amount > 0 && this.deal.topic != '') {
      this.loading = true;
      this.deal.firstName = this.userFirstName;
      this.deal.lastName = this.userLastName;
      this.deal.email = this.userEmail;

      let dealRef = doc(this.firestore, 'deals', this.dealId);
      await updateDoc(dealRef, this.deal.toJSON());
      this.dialogRef.close();
      this.loading = false;
    } else this.inputMissing = true;
  }
}
