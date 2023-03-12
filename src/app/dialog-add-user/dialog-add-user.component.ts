import { Component } from '@angular/core';
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

  constructor() {}

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
  }
}
