import { Routes } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { GradoComponent } from './components/grado/grado.component';
import { AlumnoGradoComponent } from './components/alumno-grado/alumno-grado.component';

export const routes: Routes = [
  { path: 'alumnos', component: AlumnoComponent },
  { path: 'profesores', component: ProfesorComponent },
  { path: 'grados', component: GradoComponent },
  { path: 'alumnos-grado', component: AlumnoGradoComponent },
  { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
  { path: '**', redirectTo: 'alumnos' }
];
