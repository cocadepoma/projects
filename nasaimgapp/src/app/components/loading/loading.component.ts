import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public loader: string = 'assets/loading-gif-grey.gif';
  @Input() message: string;
  constructor() {}

  ngOnInit(): void {}
}
