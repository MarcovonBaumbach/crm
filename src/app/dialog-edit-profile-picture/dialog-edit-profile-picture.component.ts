import { Component } from '@angular/core';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { doc } from '@firebase/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-profile-picture',
  templateUrl: './dialog-edit-profile-picture.component.html',
  styleUrls: ['./dialog-edit-profile-picture.component.scss']
})
export class DialogEditProfilePictureComponent {
  user: User;
  userId: string;
  loading: boolean = false;
  pictures = [
    'profile1.png',
    'profile2.png',
    'profile3.png',
    'profile4.png',
    'profile5.png',
    'profile6.png',
    'profile7.png',
    'profile8.png'
  ]

  constructor(
    private firestore: Firestore, 
    public dialogRef: MatDialogRef<DialogEditProfilePictureComponent>) {

  }

  async saveUser(picture: string) {
    this.loading = true;
    this.user.picture = picture;
    let userRef = doc(this.firestore, 'users', this.userId);
    await updateDoc(userRef, this.user.toJSON());
    this.dialogRef.close();
    this.loading = false;
  }
}
