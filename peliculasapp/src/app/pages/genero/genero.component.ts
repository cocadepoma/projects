import { Component, OnInit, HostListener } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css'],
})
export class GeneroComponent implements OnInit {
  public generoName: string = '';
  public generoId: string = '';
  public movies: Movie[] = [];
  public loading: boolean = true;

  constructor(
    private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Escuchar contínuamente si hay cambios en los parámetros
    this.activatedRoute.params.subscribe((routeParams) => {
      this.peliculasService.resetCarteleraPage();
      this.loading = true;

      this.generoId = routeParams.id.toString();

      // Buscar coincidencia con algún ID de los géneros
      this.peliculasService.getGenres().subscribe((resp) => {
        for (const i in resp) {
          if (resp[i].id.toString() == this.generoId) {
            this.generoName = resp[i].name;
          }
        }
        // Si el parámetro no corresponde con ningún genero, retornar al home
        if (this.generoName.length === 0) {
          this.router.navigateByUrl('home');
        }
      });

      this.peliculasService
        .getFilmByGenre(this.generoId)
        .subscribe((resp: Movie[]) => {
          this.movies = resp;
          this.loading = false;
        });
    });
  }

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

      this.peliculasService
        .getFilmByGenre(this.generoId)
        .subscribe((movies: Movie[]) => {
          this.movies.push(...movies);
        });
    }
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }
}
