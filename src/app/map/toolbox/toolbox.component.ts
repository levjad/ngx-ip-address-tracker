import { Component, Input, output, Signal } from '@angular/core';
import { MatFormField, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatCard, MatCardContent } from "@angular/material/card";
import { IpInfo } from "../../ip-info.interface";
import { MatDivider } from "@angular/material/divider";
import { UpperCasePipe } from "@angular/common";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-toolbox',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatCard,
    MatCardContent,
    UpperCasePipe,
    MatDivider,
    MatIconButton,
    MatIcon,
    MatSuffix,
  ],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.scss'
})
export class ToolboxComponent {
  @Input() ipInfo: Signal<IpInfo> | undefined;

  ipSearch = output<string>();

  constructor() {}

  updateSearch($event: any) {
    this.ipSearch.emit($event.target.value);
  }
}
