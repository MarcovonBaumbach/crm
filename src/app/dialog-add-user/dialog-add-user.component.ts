import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';

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
  loading: boolean = false;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.coll = collection(this.firestore, 'users');
  }

  randomImg() {
    let index = Math.floor(Math.random() * 3) + 1;
    return `assets/img/background${index}.jpg`;
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    this.user.img = this.randomImg();
    console.log(this.user);

    addDoc(this.coll, this.user.toJSON()).then((result: any) => {
      console.log('neuer User', result);
      this.dialogRef.close();
    });
    this.loading = false;
  }
}
