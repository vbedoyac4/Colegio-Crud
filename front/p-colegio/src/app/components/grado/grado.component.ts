import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { EditarGradoComponent } from '../editar-grado/editar-grado.component';
import { MatDialog } from '@angular/material/dialog';
import { GradosService, Grado, GradoDto } from '../../services/grados/grados.service'; 
import { ProfesorService, Profesor } from '../../services/profesor/profesor.service';

@Component({
  selector: 'app-grado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    EditarGradoComponent,
  ],
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css'] 
})
export class GradoComponent implements OnInit {

  grados: GradoDto[] = [];
  profesores: Profesor[] = [];
  searchQuery: string = '';
  currentRecord : Grado | null = null;;

  constructor(public dialog: MatDialog, private gradoService: GradosService, private profesorService: ProfesorService) {}

  ngOnInit(): void {
    this.loadGrados(); 
    this.getProfesores();
  }

  async loadGrados(): Promise<void> {
    try {
      const data: GradoDto[] = await firstValueFrom(this.gradoService.getGrados());
      this.grados = data; 
      console.log('Grados cargados con éxito.');
    } catch (error) {
      console.error('Error fetching grados', error);
      alert('Ocurrió un error al cargar los grados. Por favor, inténtelo de nuevo más tarde.');
    }
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
  
  getProfesorId(nombre: string): number | null {
    const profesor = this.profesores.find(x => 
      `${x.nombres} ${x.apellidos}`.toLowerCase() === nombre.trim().toLowerCase()
    );
    return profesor ? profesor.id : null; 
  }
  
  async getDbRecord(id: number): Promise<Grado | undefined> {
    return firstValueFrom(this.gradoService.getGrado(id));
  }
  


  async addGrado(): Promise<void> {
    const dialogRef = this.dialog.open(EditarGradoComponent, {
      width: '400px',
      data: { grado: { id: 0, nombre: '', profesorId: '' } } 
    });

    try {
      const result = await firstValueFrom(dialogRef.afterClosed()); 

      if (result) {
        const nuevoGrado: Grado = {
          id: 0,  
          nombre: result.nombre,
          profesorId: result.profesorId
        };

        await firstValueFrom(this.gradoService.addGrado(nuevoGrado)); 
        console.log('Grado agregado con éxito:', nuevoGrado);
        await this.loadGrados(); 
      }
    } catch (error) {
      console.error('Error al agregar el grado', error);
      alert('Error al agregar el grado. Por favor, inténtelo de nuevo más tarde.');
    }
  }
  
  async updateGrado(grado: GradoDto): Promise<void> {
    const record = await this.getDbRecord(grado.id);
    console.log("Enviando: ", record);
  
    const dialogRef = this.dialog.open(EditarGradoComponent, {
      width: '400px',
      data: { record }
    });
  
    try {
      const result = await firstValueFrom(dialogRef.afterClosed()); 
  
      if (result) {
        const gradoToUpdate: Grado = {
          id: result.id,
          nombre: result.nombre,
          profesorId: result.profesorId
        };
  
        await firstValueFrom(this.gradoService.updateGrado(gradoToUpdate)); 
        console.log('Grado actualizado con éxito:', gradoToUpdate);
        await this.loadGrados(); 
      }
    } catch (error) {
      console.error('Error al actualizar el grado', error);
      alert('Error al actualizar el grado. Por favor, inténtelo de nuevo más tarde.');
    }
  }
  

  async deleteGrado(id: number): Promise<void> {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este grado?');
  
    if (confirmation) {
      try {
        await firstValueFrom(this.gradoService.deleteGrado(id));
        this.grados = this.grados.filter(grado => grado.id !== id); // Filtrar el grado eliminado
        console.log('Grado eliminado con éxito.');
      } catch (error) {
        console.error('Error deleting grado', error);
        alert('Error al eliminar el grado. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  }

   get filteredGrados() {
    return this.grados.filter(grado => 
      grado.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      grado.profesor.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
