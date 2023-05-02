import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosHomeComponent } from './libros-home.component';

describe('LibrosHomeComponent', () => {
  let component: LibrosHomeComponent;
  let fixture: ComponentFixture<LibrosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrosHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
