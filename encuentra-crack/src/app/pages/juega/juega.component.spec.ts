import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegaComponent } from './juega.component';

describe('JuegaComponent', () => {
  let component: JuegaComponent;
  let fixture: ComponentFixture<JuegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
