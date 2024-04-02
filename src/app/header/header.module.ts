import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {CommonModule} from "@angular/common";
import { AppRoutingModule } from "src/app/app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
