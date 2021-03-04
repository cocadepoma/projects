import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public texto: string = '';
  public loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.peliculasService.resetCarteleraPage();
      this.loading = true;

      this.texto = params.texto;

      this.peliculasService
        .buscarPeliculas(params.texto)
        .subscribe((movies) => {
          this.loading = false;
          this.movies = movies;
        });
    });
  }

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

      this.peliculasService.buscarPeliculas(this.texto).subscribe((movies) => {
        this.movies.push(...movies);
      });
    }
  }
  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }
}
