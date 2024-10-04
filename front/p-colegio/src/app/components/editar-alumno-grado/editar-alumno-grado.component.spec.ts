import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlumnoGradoComponent } from './editar-alumno-grado.component';

describe('EditarAlumnoGradoComponent', () => {
  let component: EditarAlumnoGradoComponent;
  let fixture: ComponentFixture<EditarAlumnoGradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAlumnoGradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAlumnoGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
