import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiattaformaComponent } from './piattaforma.component';

describe('PiattaformaComponent', () => {
  let component: PiattaformaComponent;
  let fixture: ComponentFixture<PiattaformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiattaformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiattaformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
