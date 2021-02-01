import { Component, OnInit } from '@angular/core';
import { NasaInterfaces } from 'src/app/interfaces/nasa-interfaces';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent implements OnInit {
  public nasaData: NasaInterfaces[] = [];
  public isLoading: boolean = false;
  public url: string = 'assets/mars-trip.jpeg';
  public message: string = 'Loading, please wait';

  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getContent();
  }

  getContent() {
    this.isLoading = true;
    this.nasaService.getRandom().subscribe((data: NasaInterfaces[]) => {
      this.nasaData = data;
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    });
  }
}
