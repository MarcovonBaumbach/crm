import { Component } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user$: Observable<any>;
  coll: any;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.coll = collection(this.firestore, 'users');
    this.user$ = collectionData(this.coll, { idField: 'id'});
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
