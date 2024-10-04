import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-editar-profesor',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './editar-profesor.component.html',
  styleUrl: './editar-profesor.component.css'
})
export class EditarProfesorComponent {

  profesor: any;
  isEditing: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditarProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profesor = { ...data.profesor }; 
    this.isEditing = !!this.profesor.id; 
  }

  onSave(): void {
    this.dialogRef.close(this.profesor);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
