import { Component } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user = new User();
  item$: Observable<any>;
  coll: any;

  constructor(public dialog: MatDialog, public firestore: Firestore) {
    this.coll = collection(this.firestore, 'users');
    this.item$ = collectionData(this.coll);
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
