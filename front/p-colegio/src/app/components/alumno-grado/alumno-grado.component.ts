import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatDialog } from '@angular/material/dialog';
import { EditarAlumnoGradoComponent } from '../editar-alumno-grado/editar-alumno-grado.component';
import { AlumnosGradosService, AlumnoGrado, AlumnoGradoDto } from '../../services/alumnos-grado/alumnos-grados.service'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alumno-grado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    EditarAlumnoGradoComponent, 
  ],
  templateUrl: './alumno-grado.component.html',
  styleUrls: ['./alumno-grado.component.css'],
  providers: [HttpClient]
})
export class AlumnoGradoComponent implements OnInit {
  alumnosGrados: AlumnoGradoDto[] = [];  
  searchQuery: string = '';  
  currentRecord : AlumnoGrado | null = null;;

  constructor(
    public dialog: MatDialog,
    private alumnosGradosService: AlumnosGradosService 
  ) {}

  ngOnInit(): void {
    this.loadAlumnosGrados(); 
  }

  async loadAlumnosGrados(): Promise<void> {
    try {
      const data: AlumnoGradoDto[] = await firstValueFrom(this.alumnosGradosService.getAlumnosGrado());
      this.alumnosGrados = data; // Asignar los datos obtenidos
    } catch (error) {
      console.error('Error al cargar los alumnos grados', error);
    }
  }

  get filteredAlumnosGrado() {
    const query = this.searchQuery.toLowerCase();
    return this.alumnosGrados.filter(alumnoGrado => {
      const alumno = alumnoGrado.alumno ? alumnoGrado.alumno.toString().toLowerCase() : '';
      const grado = alumnoGrado.grado ? alumnoGrado.grado.toString().toLowerCase() : '';
      const seccion = alumnoGrado.seccion ? alumnoGrado.seccion.toLowerCase() : '';
  
      return (
        alumno.includes(query) ||  
        grado.includes(query) ||    
        seccion.includes(query)      
      );
    });
  }
  

  async getDbRecord(id: number): Promise<AlumnoGrado | undefined> {
    try {
      const record = await firstValueFrom(this.alumnosGradosService.getAlumnoGrado(id));
      return record;
    } catch (error) {
      console.error('Error al obtener el registro del alumno grado:', error);
      return undefined; 
    }
  }

  

  async updateAlumnoGrado(alumnoGrado: AlumnoGradoDto): Promise<void> {
    console.log('Alumno grado a actualizar:', alumnoGrado);
  
    let record: AlumnoGrado | undefined;
    try {
      record = await this.getDbRecord(alumnoGrado.id);
      if (!record) {
        console.error('Registro no encontrado para el alumno grado con ID:', alumnoGrado.id);
        return; 
      }
    } catch (error) {
      console.error('Error al obtener el registro del alumno grado:', error);
      return; 
    }
  
    console.log('Enviando:', record);
  
    const dialogRef = this.dialog.open(EditarAlumnoGradoComponent, {
      width: '400px',
      data: { record } 
    });
  
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {

          await firstValueFrom(this.alumnosGradosService.updateAlumnoGrado(result));
          this.loadAlumnosGrados(); 
          console.log('Alumno grado actualizado con éxito.');
        } catch (error) {
          console.error('Error al actualizar el alumno grado:', error);
        }
      }
    });
  }


  async addAlumnoGrado(): Promise<void> {
    const dialogRef = this.dialog.open(EditarAlumnoGradoComponent, {
      width: '400px',
      data: { alumnoGrado: { id: 0, alumnoId: null, gradoId: null, seccion: '' } } 
    });
  
    try {
      const result = await dialogRef.afterClosed().toPromise(); 
  
      if (result) {

        await firstValueFrom(this.alumnosGradosService.addAlumnoGrado(result));
        this.loadAlumnosGrados(); // Recargar los alumnos después de agregar uno nuevo
        console.log('Alumno grado agregado con éxito.');
      }
    } catch (error) {
      console.error('Error al agregar el alumno grado:', error);
      alert('Error al agregar el alumno grado. Por favor, inténtelo de nuevo más tarde.');
    }
  }

  async deleteAlumnoGrado(id: number): Promise<void> {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este alumno del grado?');
  
    if (confirmation) {
      try {
        await firstValueFrom(this.alumnosGradosService.deleteAlumnoGrado(id)); 
        this.loadAlumnosGrados(); 
        console.log('Alumno grado eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar el alumno grado:', error);
        alert('Error al eliminar el alumno grado. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  }
}
