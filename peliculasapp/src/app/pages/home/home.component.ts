import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';

import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  // Infinite SCROLL
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1650;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.peliculasService.cargando) {
        return;
      }

      this.peliculasService.getCartelera().subscribe((movies) => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    // Obtener las pelis al iniciar HOME
    this.peliculasService.getCartelera().subscribe((movies) => {
      this.movies = movies;
      this.moviesSlideshow = this.peliculasService.getSlider();
    });
  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }
}
