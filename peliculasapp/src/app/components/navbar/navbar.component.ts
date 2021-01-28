import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public show: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  buscarPelicula(texto: string) {
    texto = texto.trim();

    if (texto.length === 0) {
      return;
    }

    this.router.navigateByUrl(`buscar/${texto}`);
  }
  irAlGenero(genreID: string) {
    this.router.navigateByUrl(`genero/${genreID}`);
  }
  showResponsive() {
    this.show = !this.show;
    if (this.show) {
      document.querySelector('body').classList.add('toggleFade');
    } else {
      document.querySelector('body').classList.remove('toggleFade');
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.show) {
      if (
        event.target.id == 'dentro' ||
        event.target.id == 'dentro-2' ||
        event.target.id == 'dentro-3' ||
        event.target.id == 'dentro-4'
      ) {
        return;
      } else {
        this.show = !this.show;
        document.querySelector('body').classList.remove('toggleFade');
      }
    }
  }
}
