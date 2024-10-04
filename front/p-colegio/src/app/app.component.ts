import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [RouterModule, MatSidenavModule, MatToolbarModule, MatIconModule], 
  templateUrl:'app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent {}
