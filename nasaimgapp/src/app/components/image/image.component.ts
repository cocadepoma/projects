import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NasaInterfaces } from 'src/app/interfaces/nasa-interfaces';
import { trigger, style, animate, transition } from '@angular/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(200),
      ]),
      transition(':leave', [
        animate(200, style({ transform: 'translateX(100%)' })),
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

  constructor(public auth: AngularFireAuth, private nasaService: NasaService) {}
  ngOnInit() {
    this.isLoading = true;
  }
  hideLoader() {
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }
  ngOnChanges(): void {
    this.isLoading = true;
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
}
