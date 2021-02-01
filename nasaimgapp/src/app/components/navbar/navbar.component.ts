import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NasaService } from 'src/app/services/nasa.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public model: NgbDateStruct;
  public loginTemplate: boolean = false;
  public responsive: boolean = false;
  public today: NgbDateStruct;

  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    private nasaService: NasaService
  ) {}

  ngOnInit(): void {
    this.model = this.getToday();
  }

  goToSearch() {
    let month = this.model.month.toString();
    let day = this.model.day.toString();
    if (month.length < 2) {
      month = `0${this.model.month}`;
    }
    if (day.length < 2) {
      day = `0${this.model.day}`;
    }
    this.router.navigateByUrl('search/' + `${this.model.year}-${month}-${day}`);
  }

  public getToday() {
    let date = new Date();
    let now: NgbDateStruct;

    if (date.getDate() != 1) {
      now = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate() - 1,
      };
    } else {
      let date = new Date();

      date.setMonth(date.getMonth());
      date.setDate(0); // get the last day of previous month
      now = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    }
    return now;
  }
  showLoginPopup() {
    this.loginTemplate = true;
  }
  closePopup() {
    this.loginTemplate = false;
  }

  logout() {
    this.nasaService.logout();
  }
  toggleResponsive() {
    this.responsive = !this.responsive;
  }
}
