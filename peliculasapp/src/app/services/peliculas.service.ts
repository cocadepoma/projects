import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Genre, MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3/';
  private carteleraPage = 1;
  public cargando: boolean = false;
  public sliderMovies: Movie[] = [];

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: 'bace800d5493dcc9a0348cd754976608',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }
  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;

    return this.http
      .get<CarteleraResponse>(` ${this.baseUrl}movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((resp) => {
          if (this.sliderMovies.length === 0) {
            this.sliderMovies = resp.results;
          }
          return resp.results;
        }),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }
  getSlider() {
    return this.sliderMovies;
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = {
      ...this.params,
      query: texto,
      include_adult: 'true',
    };

    this.cargando = true;

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}search/movie`, {
        params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getPeliculaDetalle(id: string) {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}movie/${id}`, {
        params: this.params,
      })
      .pipe(
        // of regresa un Observable
        catchError((err) => of(null))
      );
  }

  getCreditsById(id: string): Observable<Cast[]> {
    return this.http
      .get<CreditsResponse>(`${this.baseUrl}movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of([]))
      );
  }

  getColor(average: number) {
    let averageHundred = average * 10;

    if (averageHundred > 80) {
      return 'green';
    } else if (averageHundred < 80 && averageHundred >= 60) {
      return 'yellow';
    } else if (averageHundred < 60 && averageHundred >= 50) {
      return 'orange';
    } else if (averageHundred < 50 && averageHundred > 0) {
      return 'red';
    } else {
      return 'black';
    }
  }

  getGenres(): Observable<Genre[]> {
    return this.http
      .get(`${this.baseUrl}genre/movie/list?`, {
        params: this.params,
      })
      .pipe(
        map((resp: any) => {
          return resp.genres;
        })
      );
  }

  getFilmByGenre(genreID: string) {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http
      .get(
        `${this.baseUrl}discover/movie?&sort_by=popularity.desc&include_adult=true&include_video=false&page=${this.carteleraPage}&with_genres=${genreID}`,
        { params: this.params }
      )
      .pipe(
        map((resp: any) => {
          return resp.results;
        }),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }
}
