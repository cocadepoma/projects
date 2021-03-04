import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';

// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];

  private mySwiper: Swiper;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    this.mySwiper = new Swiper('.swiper-container', {

      autoplay: { delay: 5000, },
      // Optional parameters
      loop: true,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  onSlideNext() {
    this.mySwiper.slideNext();
  }
  onSlidePrev() {
    this.mySwiper.slidePrev();
  }
  onMovieClick(movie) {
    this.router.navigate(['/pelicula', movie.id]);
  }
}
