import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { EditarAlumnoComponent } from '../editar-alumno/editar-alumno.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Alumno, AlumnoService } from '../../services/alumno/alumno.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    EditarAlumnoComponent,
  ],
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
  providers: [HttpClient] 
})
export class AlumnoComponent implements OnInit {
  alumnos: Alumno[] = [];
  searchQuery: string = '';

  constructor(public dialog: MatDialog, private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.getAlumnos(); 
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    
    const validDate = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(validDate.getTime())) return 'Fecha inválida'; 
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    };
    
    return new Intl.DateTimeFormat('es-ES', options).format(validDate);
  }

  async getAlumnos(): Promise<void> {
    try {

      const response = await firstValueFrom(this.alumnoService.getAlumnos());

      this.alumnos = response.map((alumno) => ({
        ...alumno,
        fechaNacimiento: new Date(alumno.fechaNacimiento) 
      }));

    } catch (error) {
      console.error('Error obteniendo alumnos:', error);
      alert('Ocurrió un error obteniendo alumnos. Por favor, inténtelo de nuevo más tarde.'); 
    }
  }

  async updateAlumno(alumno: Alumno): Promise<void> {
    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
      width: '400px',
      data: { 
        alumno: { 
          ...alumno,
          fechaNacimiento: alumno.fechaNacimiento instanceof Date 
            ? alumno.fechaNacimiento 
            : new Date(alumno.fechaNacimiento)
        }} 
    });
  
    try {
      const result = await firstValueFrom(dialogRef.afterClosed()); 
  
      if (result) {
        await firstValueFrom(this.alumnoService.updateAlumno(result)); 
        await this.getAlumnos(); 
        console.log('Alumno actualizado con éxito.');
      }
    } catch (error) {
      console.error('Error al actualizar el alumno:', error);
      alert('Error al actualizar el alumno. Por favor, inténtelo de nuevo más tarde.'); 
    }
  }
  
  async addAlumno(): Promise<void> {
    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
      width: '400px',
      data: { alumno: { id: 0, nombres: '', apellidos: '', genero: '', fechaNacimiento: new Date() } }
    });
  
    try {
      const result = await firstValueFrom(dialogRef.afterClosed()); 
  
      if (result) {
        await firstValueFrom(this.alumnoService.addAlumno(result)); 
        this.getAlumnos(); 
        console.log('Alumno agregado con éxito.');
      }
    } catch (error) {
      console.error('Error al agregar el alumno:', error);
      alert('Error al agregar el alumno. Por favor, inténtelo de nuevo más tarde.');
    }
  }
  

  async deleteAlumno(id: number): Promise<void> {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este alumno?');

    if (confirmation) {
      try {

        await firstValueFrom(this.alumnoService.deleteAlumno(id)); 
        await this.getAlumnos(); 
        console.log('Alumno eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar el alumno:', error);
        alert('Error al eliminar el alumno. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  }

  
  get filteredAlumnos() {
    return this.alumnos.filter(alumno => 
      alumno.nombres.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      alumno.apellidos.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      alumno.genero.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
