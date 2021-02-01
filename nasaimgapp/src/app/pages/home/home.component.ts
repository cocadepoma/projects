import { Component, OnInit } from '@angular/core';
import { NasaInterfaces } from 'src/app/interfaces/nasa-interfaces';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public infoNasa: NasaInterfaces;
  public type: string = 'image';
  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    let date = new Date();

    if (date.getDate() == 1) {
      date.setMonth(date.getMonth());
      date.setDate(0); // get the last day of previous month
    }

    this.nasaService
      .getImageDay(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      )
      .subscribe((data: NasaInterfaces) => {
        if (data.media_type == 'image') {
          this.type = 'image';
        } else if (data.media_type == 'video') {
          this.type = 'video';
        } else {
          console.error('Invalid interface type');
        }
        this.infoNasa = data;
      });
  }
}
