import { Component } from '@angular/core';
import { collectionData, doc, Firestore, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection } from '@firebase/firestore';
import { Deal } from 'src/models/deal.class';
import { DataService } from '../data.service';


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
  collDealsStarted: any;
  loading = false;
  showButton = true;
  inputMissing = false;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddDealComponent>, private dataservice: DataService) {
    this.coll = collection(this.firestore, 'deals');
    this.collDealsStarted = collection(this.firestore, 'deals-started');
  }

  selectUser(user) {
    this.userEmail = user.email;
    this.userFirstName = user.firstName;
    this.userLastName = user.lastName;
    this.showButton = false;
  }

  saveDeal() {
    if (this.userEmail != '' && this.deal.amount > 0 && this.deal.topic != '') {
      this.loading = true;
      this.deal.firstName = this.userFirstName;
      this.deal.lastName = this.userLastName;
      this.deal.email = this.userEmail;

      addDoc(this.coll, this.deal.toJSON()).then(() => {
        this.dialogRef.close();
      });
      this.setDealData(this.deal.email);
      this.loading = false;
    } else this.inputMissing = true;
  }

  async setDealData(email) {
    let i = 0
    let dealRef = collection(this.firestore, 'deals-started');
    let querySnapshot = await getDocs(dealRef);
    querySnapshot.forEach((doc) => {     
      let document = doc.data();
      let id = doc.id;
      if(document['emailDealsStarted'] == email) {
        this.dataservice.amountDealsStarted[i]++;
        this.updating(id, i);       
      }
      i++;
    });
  }
  
  updating(id, i) {
    updateDoc(doc(this.firestore, 'deals-started', id), {amountDealsStarted: this.dataservice.amountDealsStarted[i]});
  }
}
