import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import Angular Material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Import the root component
import { AppComponent } from './app.component';
import { routes } from './app.routes';  // Import the routing module

// Import standalone components
import { AlumnoComponent } from './components/alumno/alumno.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { GradoComponent } from './components/grado/grado.component';
import { AlumnoGradoComponent } from './components/alumno-grado/alumno-grado.component';

@NgModule({
  // No declarations since standalone components don't need to be declared
  imports: [
    BrowserModule,                 // Required for running the app in the browser
    BrowserAnimationsModule,        // Required for Angular Material animations
    MatSidenavModule,               // Angular Material Sidenav
    MatToolbarModule,               // Angular Material Toolbar
    MatIconModule,                  // Angular Material Icons
    RouterModule.forRoot(routes),   // Use RouterModule.forRoot to set up routing
    

    // Import standalone components
    AlumnoComponent,
    ProfesorComponent,
    GradoComponent,
    AlumnoGradoComponent,
    FormsModule
  ],
  providers: [],
  bootstrap: []         // Bootstrap AppComponent
})
export class AppModule { }
