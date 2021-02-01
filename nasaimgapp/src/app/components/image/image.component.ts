import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NasaInterfaces } from 'src/app/interfaces/nasa-interfaces';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [
    trigger('fadeSlideGrowKeyframe', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.2) translateY(50px)' }),
        animate(
          '500ms',
          keyframes([
            style({ opacity: 1, offset: 0.3 }),
            style({ transform: 'translateY(0)', offset: 0.6 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ImageComponent implements OnInit, OnChanges {
  @Input() infoNasa: NasaInterfaces;

  public isLoading: boolean = false;
  public isSaving: boolean = false;
  public message: string = 'Loading, please wait';
  public message2: string = 'Saving, please wait';
  public lastDate: Date;
  public type: string = 'image';
  public video: string = 'assets/mars-trip.jpeg';

  constructor(public auth: AngularFireAuth, private nasaService: NasaService) {}
  ngOnInit() {
    this.isLoading = true;
    this.lastDate = this.infoNasa.date;
  }
  hideLoader() {
    setTimeout(() => {
      this.isLoading = false;
      this.type = this.infoNasa.media_type;
    }, 300);
  }
  ngOnChanges(): void {
    this.isLoading = true;
    this.lastDate = this.infoNasa.date;
  }

  async saveImage(infoNasa: NasaInterfaces) {
    this.isSaving = true;

    await this.nasaService.saveImage(infoNasa).then((resp) => {
      if (resp) {
        setTimeout(() => {
          this.isSaving = false;
        }, 500);
      }
    });
  }

  btnLeft() {
    let date = new Date(this.lastDate);

    if (date.getDate() == 1) {
      this.isLoading = true;
      date.setMonth(date.getMonth());
      date.setDate(0); // get the last day of previous month
      this.nasaService
        .getImageDay(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        )
        .subscribe((image: NasaInterfaces) => {
          this.isLoading = false;
          this.infoNasa = image;
          this.lastDate = image.date;
          this.type = image.media_type;
          setTimeout(() => {}, 300);
        });
    } else {
      this.isLoading = true;
      this.nasaService
        .getImageDay(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}`
        )
        .subscribe((image: NasaInterfaces) => {
          this.infoNasa = image;
          this.lastDate = image.date;
          this.type = image.media_type;
          setTimeout(() => {
            this.isLoading = false;
          }, 300);
        });
    }
  }
  btnRight() {
    //var tomorrow = this.formatDate(new Date(new Date().valueOf() + 86350989)); //That will always give you tomorrow (jump ahead 24 hours)
    var yesterday = this.formatDate(new Date(new Date().valueOf() - 86350989)); //Will give you yesterday.
    var imageDateNow = this.formatDate(this.lastDate);

    if (imageDateNow >= yesterday) {
      return;
    }
    this.isLoading = true;

    var next = this.formatDate(
      new Date(new Date(this.lastDate).valueOf() + 86350989)
    );

    this.nasaService.getImageDay(next).subscribe((image: NasaInterfaces) => {
      this.infoNasa = image;
      this.lastDate = image.date;
      this.type = image.media_type;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    });
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
