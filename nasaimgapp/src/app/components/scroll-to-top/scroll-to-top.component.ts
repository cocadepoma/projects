import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent implements OnInit {
  public showRocket: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (pos > 500) {
      this.showRocket = true;
    } else {
      this.showRocket = false;
    }
  }
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}
  goToTop() {
    this.document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
}
