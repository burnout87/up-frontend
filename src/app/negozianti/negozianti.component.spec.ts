import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegoziantiComponent } from './negozianti.component';

describe('NegoziantiComponent', () => {
  let component: NegoziantiComponent;
  let fixture: ComponentFixture<NegoziantiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegoziantiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegoziantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
