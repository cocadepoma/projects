import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PeliculasService } from 'src/app/services/peliculas.service';
import {
  Genre,
  MovieResponse,
  Productioncompany,
  Productioncountry,
} from '../../interfaces/movie-response';
import { StarRatingComponent } from 'ng-starrating';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public movie: MovieResponse;

  public companies: Productioncompany[];
  public companiesLength: number;

  public countries: Productioncountry[];
  public countriesLength: number;

  public genres: Genre[];
  public genresLength: number;

  public cast: Cast[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Desestructuración
    // const id = this.activatedRoute.snapshot.params.id;
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCreditsById(id),
    ]).subscribe(([movie, credits]) => {
      console.log(movie);

      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = movie;

      this.cast = credits.filter((actor) => actor.profile_path !== null);

      this.companies = movie.production_companies.map(
        (resp: Productioncompany) => {
          return resp.name;
        }
      );
      this.companiesLength = Object.keys(this.companies).length;
      this.countries = movie.production_countries.map(
        (resp: Productioncountry) => {
          return resp.name;
        }
      );
      this.countriesLength = Object.keys(this.countries).length;

      this.genres = movie.genres.map((resp: Genre) => {
        return resp.name;
      });

      this.genresLength = Object.keys(this.genres).length;
    });
  }

  onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    alert(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  getColor(average: number) {
    return this.peliculasService.getColor(average);
  }
  volver() {
    this.location.back();
  }
}
