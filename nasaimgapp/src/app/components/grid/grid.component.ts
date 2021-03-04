import { Component, Input, OnInit } from '@angular/core';
import { NasaInterfaces } from 'src/app/interfaces/nasa-interfaces';

import { AngularFireAuth } from '@angular/fire/auth';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() nasaData: NasaInterfaces[];
  @Input() canDelete: boolean;
  public isSaving: boolean = false;
  public message2: string = 'Saving, please wait';

  constructor(public auth: AngularFireAuth, private nasaService: NasaService) {}

  ngOnInit(): void {}

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
  async deleteImage(i: number, imageDate: string) {
    await this.nasaService
      .deleteImage(i, imageDate)
      .catch((err) => console.error(err));
  }
}
