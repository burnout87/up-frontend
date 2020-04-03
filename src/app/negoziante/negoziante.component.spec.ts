import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegozianteComponent } from './negoziante.component';

describe('NegozianteComponent', () => {
  let component: NegozianteComponent;
  let fixture: ComponentFixture<NegozianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegozianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegozianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
