import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { EditarProfesorComponent } from '../editar-profesor/editar-profesor.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfesorService, Profesor } from '../../services/profesor/profesor.service'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    EditarProfesorComponent,
  ],
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
  profesores: Profesor[] = [];
  searchQuery: string = '';

  constructor(
    public dialog: MatDialog,
    private profesorService: ProfesorService,
  ) {}

  ngOnInit(): void {
    this.getProfesores(); 
  }

async getProfesores(): Promise<void> {
  try {
    this.profesores = await firstValueFrom(this.profesorService.getProfesores());
    console.log('Profesores cargados con éxito.');
  } catch (error) {
    console.error('Error fetching profesores', error);
    alert('Ocurrió un error al cargar los profesores. Por favor, inténtelo de nuevo más tarde.');
  }
}

async updateProfesor(profesor: Profesor): Promise<void> {
  const dialogRef = this.dialog.open(EditarProfesorComponent, {
    width: '400px',
    data: { profesor }
  });

  try {
    const result = await firstValueFrom(dialogRef.afterClosed()); 
    if (result) {
      await firstValueFrom(this.profesorService.updateProfesor(result));
      console.log('Profesor actualizado con éxito:', result);
      await this.getProfesores(); 
    }
  } catch (error) {
    console.error('Error updating profesor', error);
    alert('Error al actualizar el profesor. Por favor, inténtelo de nuevo más tarde.');
  }
}

async addProfesor(): Promise<void> {
  const dialogRef = this.dialog.open(EditarProfesorComponent, {
    width: '400px',
    data: { profesor: { id: 0, nombres: '', apellidos: '', genero: '' } }
  });

  try {
    const result = await firstValueFrom(dialogRef.afterClosed()); 

    if (result) {
      await firstValueFrom(this.profesorService.addProfesor(result));
      console.log('Profesor agregado con éxito:', result);
      await this.getProfesores(); 
    }
  } catch (error) {
    console.error('Error adding profesor', error);
    alert('Error al agregar el profesor. Por favor, inténtelo de nuevo más tarde.');
  }
}


async deleteProfesor(id: number): Promise<void> {
  const confirmation = confirm('¿Estás seguro de que deseas eliminar este profesor?');

  if (confirmation) {
    try {

      await firstValueFrom(this.profesorService.deleteProfesor(id)); 
      await this.getProfesores(); 
      console.log('Profesor eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar el profesor:', error);
      alert('Error al eliminar el profesor. Por favor, inténtelo de nuevo más tarde.'); 
    }
  }
}

  get filteredProfesores() {
    return this.profesores.filter(profesor => 
      profesor.nombres.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      profesor.apellidos.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      profesor.genero.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
