import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NasaInterfaces } from 'src/app/interfaces/nasa-interfaces';
import { AngularFireAuth } from '@angular/fire/auth';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnChanges {
  @Input() infoNasa: NasaInterfaces;
  public isLoading: boolean = false;
  public isSaving: boolean = false;
  public video: string = 'assets/mars-trip.jpeg';
  public message: string = 'Loading, please wait';
  public message2: string = 'Saving, please wait';

  constructor(public auth: AngularFireAuth, private nasaService: NasaService) {}

  ngOnInit(): void {
    this.isLoading = false;
  }
  ngOnChanges(): void {
    this.isLoading = true;
  }

  hideLoader() {
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
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
