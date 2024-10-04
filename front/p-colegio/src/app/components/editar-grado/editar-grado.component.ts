import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ProfesorService, Profesor } from '../../services/profesor/profesor.service';
import { Grado } from '../../services/grados/grados.service'


@Component({
  selector: 'app-editar-grado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './editar-grado.component.html',
  styleUrls: ['./editar-grado.component.css']
})
export class EditarGradoComponent {
  grado: Grado;
  isEditing: boolean;
  profesores: Profesor[] = [];

  constructor(
    private profesorService: ProfesorService,
    public dialogRef: MatDialogRef<EditarGradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.grado = data.record ? { ...data.record } : this.initializeGrado();
    this.isEditing = !!this.grado.id;
    console.log("Recibiendo:",this.grado)
  }

  private initializeGrado(): Grado {

    return { id: 0, nombre: '', profesorId: 0};
  }

  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores(): void {
    this.profesorService.getProfesores().subscribe(
      (response) => {
        this.profesores = response;

      },
      (error) => {
        console.error('Error obteniendo profesores', error);
      }
    );
  }

  onSave(): void {
    const gradoAEnviar = {
      id: this.grado.id,
      nombre: this.grado.nombre,
      profesorId: this.grado.profesorId
    };

    this.dialogRef.close(gradoAEnviar);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
