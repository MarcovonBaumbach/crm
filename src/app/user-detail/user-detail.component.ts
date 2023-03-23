import { Component, OnInit } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { doc } from '@firebase/firestore';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditProfilePictureComponent } from '../dialog-edit-profile-picture/dialog-edit-profile-picture.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId = '';
  userRef;
  user: User = new User();

  constructor(
    private route: ActivatedRoute, 
    private firestore : Firestore, 
    public dialog: MatDialog,
    ) {
    }

  /**
   * getting firestore document id of current user via url route 
   */
  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.userId = param.get('id');
      this.getUser();
    })
  }

  /**
   * getting firestore data of current user
   */
  async getUser() { 
    this.userRef = doc(this.firestore, 'users', this.userId);
    let docSnapshot = await getDoc(this.userRef);
    this.user = new User(docSnapshot.data());
  }

  /**
   * open dialog to select a new profile image
   */
  editProfilePicture() {
    const dialog = this.dialog.open(DialogEditProfilePictureComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed().subscribe(() => {
      this.getUser();
    });
  }

  /**
   * open dialog to change user information
   */
  editUserHeader() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed().subscribe(() => {
      this.getUser();
    });
  }

  /**
   * open dialog to change user address
   */
  editUserComponent() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed().subscribe(() => {
      this.getUser();
    });
  }
}
