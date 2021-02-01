import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies-advert',
  templateUrl: './cookies-advert.component.html',
  styleUrls: ['./cookies-advert.component.scss'],
})
export class CookiesAdvertComponent implements OnInit {
  public show: boolean = true;
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('data')) {
      this.show = false;
    }
  }

  saveCookie() {
    this.show = false;

    if (localStorage.getItem('data')) {
      return;
    }

    localStorage.setItem('data', JSON.stringify({ data: 'saved', test: 'ok' }));
  }
}
