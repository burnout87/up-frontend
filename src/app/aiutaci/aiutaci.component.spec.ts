import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiutaciComponent } from './aiutaci.component';

describe('AiutaciComponent', () => {
  let component: AiutaciComponent;
  let fixture: ComponentFixture<AiutaciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiutaciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiutaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
