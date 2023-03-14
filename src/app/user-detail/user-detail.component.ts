import { Component, OnInit } from '@angular/core';
import { docData, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, DocumentData } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore : Firestore) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.userId = param.get('id');
      this.getUser();
    })
  }

  async getUser() {
    let userRef = doc(this.firestore, 'users', this.userId);
    let docSnapshot = await getDoc(userRef);
    this.user = new User(docSnapshot.data());
    console.log(this.user);
  }
}
