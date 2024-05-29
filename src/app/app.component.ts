import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./map/map.component";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-ip-address-tracker';
}
