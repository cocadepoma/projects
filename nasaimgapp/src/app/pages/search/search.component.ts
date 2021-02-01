import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NasaService } from 'src/app/services/nasa.service';
import { NasaInterfaces } from 'src/app/interfaces/nasa-interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public fullDate: Date;
  public type: string = 'image';
  public infoNasa: NasaInterfaces;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private nasaService: NasaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (Date.parse(params.id)) {
        let now = new Date();
        this.fullDate = new Date(params.id);

        if (now > this.fullDate) {
          this.nasaService
            .getImageDay(
              `${this.fullDate.getFullYear()}-${
                this.fullDate.getMonth() + 1
              }-${this.fullDate.getDate()}`
            )
            .subscribe((data: NasaInterfaces) => {
              if (data.media_type == 'image') {
                this.type = 'image';
              } else if (data.media_type == 'video') {
                this.type = 'video';
              } else {
                console.error('error');
              }
              this.infoNasa = data;
            });
        } else {
          this.router.navigateByUrl('home');
        }
      } else {
        this.router.navigateByUrl('home');
      }
    });
  }
}
