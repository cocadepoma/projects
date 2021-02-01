import { Component, OnInit } from '@angular/core';
import { UserContact } from '../../interfaces/user-interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public bg: string = 'assets/mars-trip.jpeg';
  public user: UserContact;
  constructor() {
    this.user = {
      email: '',
      name: '',
      country: '',
      zip: 0,
      age: 0,
      sex: '',
      text: '',
      gamer: false,
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.user);
  }
}
