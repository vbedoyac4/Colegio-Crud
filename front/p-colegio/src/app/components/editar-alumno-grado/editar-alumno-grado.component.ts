import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { GradoDto, GradosService } from '../../services/grados/grados.service';
import { Alumno, AlumnoService } from '../../services/alumno/alumno.service';
import { AlumnoGrado } from '../../services/alumnos-grado/alumnos-grados.service';

@Component({
  selector: 'app-editar-alumno-grado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './editar-alumno-grado.component.html',
  styleUrls: ['./editar-alumno-grado.component.css']
})
export class EditarAlumnoGradoComponent {
  alumnoGrado: AlumnoGrado; 
  isEditing: boolean; 
  alumnos: Alumno[] = []; 
  grados: GradoDto[] = []; 

  constructor(
    private alumnosService: AlumnoService,
    private gradosService: GradosService,
    public dialogRef: MatDialogRef<EditarAlumnoGradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {

    this.alumnoGrado = data.record ? { ...data.record } : this.initializeAlumnoGrado();
    this.isEditing = !!this.alumnoGrado.id; 
    console.log("Recibiendo:",this.alumnoGrado)
  }

  private initializeAlumnoGrado(): AlumnoGrado {

    return { id: 0, alumnoId: 0, gradoId: 0, seccion: '' };
  }

  ngOnInit(): void {
    this.loadAlumnos(); 
    this.loadGrados(); 
  }

  loadAlumnos(): void {
    this.alumnosService.getAlumnos().subscribe(
      (response) => {
        this.alumnos = response; 
      },
      (error) => {
        console.error('Error obteniendo alumnos', error);
      }
    );
  }

  loadGrados(): void {
    this.gradosService.getGrados().subscribe(
      (response) => {
        this.grados = response; 
      },
      (error) => {
        console.error('Error obteniendo grados', error);
      }
    );
  }

  onSave(): void {
    const gradoAEnviar: AlumnoGrado = {
      id: this.alumnoGrado.id,
      alumnoId: this.alumnoGrado.alumnoId,
      gradoId: this.alumnoGrado.gradoId,
      seccion: this.alumnoGrado.seccion
    };
    console.log(gradoAEnviar); 
    this.dialogRef.close(gradoAEnviar); 
  }
  
  onCancel(): void {
    this.dialogRef.close(); 
  }
}
