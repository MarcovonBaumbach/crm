import { Component } from '@angular/core';
import { doc, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date;
  startDate = new Date(1920, 0, 1);
  coll: any;
  collDealsStarted: any;
  loading: boolean = false;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>, private dataservice: DataService) {
    this.coll = collection(this.firestore, 'users');
    this.collDealsStarted = collection(this.firestore, 'deals-started');
  }

  randomImg() {
    let index = Math.floor(Math.random() * 3) + 1;
    return `assets/img/background${index}.jpg`;
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    this.user.img = this.randomImg();
    this.user.picture = 'profile1.png';
    let fullName = this.user.firstName + ' ' + this.user.lastName;
    this.setDealData(fullName)
    addDoc(this.coll, this.user.toJSON()).then((result: any) => {
      console.log('neuer User', result);  
    }); 
    this.dialogRef.close();
    this.loading = false;
  }

  async setDealData(fullName) {
    setDoc(doc(this.collDealsStarted), {
      nameDealsStarted: fullName,
      amountDealsStarted: 0,
      emailDealsStarted: this.user.email
    });
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
}
