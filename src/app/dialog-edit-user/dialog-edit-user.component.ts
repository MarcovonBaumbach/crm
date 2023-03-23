import { Component } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user: User;
  userId: string;
  birthDate: Date;
  startDate = new Date(1920, 0, 1);
  loading: boolean = false;
  inputMissing: boolean = false;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }

  /**
   * update edited user information on firestore
   */
  async saveUser() {
    if (this.saveUserValidation()) {
      this.loading = true;
      if (this.birthDate) {
        this.user.birthDate = this.birthDate.getTime();
      }
      let userRef = doc(this.firestore, 'users', this.userId);
      await updateDoc(userRef, this.user.toJSON());
      this.dialogRef.close();
      this.loading = false;
    } else this.inputMissing = true;
  }

  /**
   * validating the input fields
   */
  saveUserValidation() {
    return (this.user.firstName != ''
      && this.user.lastName != ''
      && this.user.email != ''
    );
  }
}
