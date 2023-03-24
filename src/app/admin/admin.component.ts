import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {v4 as uuidv4} from "uuid";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  addForm!: FormGroup
  productSub!: Subscription;

  constructor(private http: HttpClient, private productService: ProductService, private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.productSub = this.productService.addProduct(new Product(
        Number(uuidv4()),
        this.addForm.value.name,
        this.addForm.value.description,
        this.addForm.value.price)
      ).subscribe(() => {
        this._snackBar.open('New product has been added to shop', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      }, () => {
        return this._snackBar.open("New product has been added to shop", 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      })
    }
  }
}
