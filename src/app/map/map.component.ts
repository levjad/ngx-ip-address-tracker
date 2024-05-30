import { AfterViewInit, Component, signal, Signal } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient, HttpParams } from "@angular/common/http";
import { IpInfo } from "../ip-info.interface";
import { ToolboxComponent } from "./toolbox/toolbox.component";


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    ToolboxComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  map: any;
  layerGroup: any;
  ipInfo: Signal<IpInfo> | undefined;

  constructor(private readonly http: HttpClient) {
    this.searchIp();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 50.217201466867394, 11.065649218205582 ],
      zoom: 4
    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.layerGroup = L.layerGroup().addTo(this.map);

    tiles.addTo(this.map);
  }

  private centerLeafletMapOnMarker(map: L.Map, marker: L.Marker | L.CircleMarker) {
    const latLngs = [ marker.getLatLng() ];
    const markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
  }

  searchIp(ip?: string) {
    this.http.get<IpInfo>(`http://ip-api.com/json/${ip ? ip : ''}`).subscribe(res => {
      this.ipInfo = signal(Object.assign({}, res));

      this.layerGroup.clearLayers();

      if (!res.lat || !res.lon) {
        this.map.setView([ 50.217201466867394, 11.065649218205582 ], 4);
        return;
      }

      const marker = L.circleMarker([res.lat!, res.lon!]);
      marker.addTo(this.layerGroup);

      this.centerLeafletMapOnMarker(this.map, marker);
    });
  }
}
