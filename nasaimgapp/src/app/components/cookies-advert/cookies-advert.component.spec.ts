import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesAdvertComponent } from './cookies-advert.component';

describe('CookiesAdvertComponent', () => {
  let component: CookiesAdvertComponent;
  let fixture: ComponentFixture<CookiesAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
