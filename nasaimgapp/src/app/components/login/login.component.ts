import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NasaService } from 'src/app/services/nasa.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() close = new EventEmitter();
  constructor(
    private nasaService: NasaService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  loginMedia(tipo: string) {
    this.nasaService.login(tipo);
    setTimeout(() => {
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.close.emit(false);
        }
      });
    }, 1000);
  }
  closePopup() {
    this.close.emit(false);
  }
}
