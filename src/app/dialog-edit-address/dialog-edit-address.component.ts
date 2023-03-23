import { Component } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User;
  userId: string;
  loading: boolean = false;
  inputMissing: boolean = false;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

  }

  /**
   * save changes to users collection on firestore
   */
  async saveUser() {
    if (this.user.city != '' && this.user.zipCode > 0 && this.user.street != '') {
      this.loading = true;
      let userRef = doc(this.firestore, 'users', this.userId);
      await updateDoc(userRef, this.user.toJSON());
      this.dialogRef.close();
      this.loading = false;
    } else this.inputMissing = true;
  }
}
