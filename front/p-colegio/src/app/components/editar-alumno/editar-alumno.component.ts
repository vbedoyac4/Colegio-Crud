import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Alumno } from '../../services/alumno/alumno.service';

@Component({
  selector: 'app-editar-alumno',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

  alumno: Alumno; 
  isEditing: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.alumno = { ...data.alumno }; 
    this.isEditing = !!this.alumno.id; 
  }

  ngOnInit(): void {
    if (typeof this.alumno.fechaNacimiento === 'string') {
      this.alumno.fechaNacimiento = new Date(this.alumno.fechaNacimiento);
    }
  }

  onDateChange(event: string): void {
    this.alumno.fechaNacimiento = new Date(event);
  }

  onSave(): void {
    this.dialogRef.close(this.alumno); 
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
