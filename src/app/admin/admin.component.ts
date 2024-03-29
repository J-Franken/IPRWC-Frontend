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
      ).subscribe(
        () => {
          this._snackBar.open('New product has been added to the shop.', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        },
        (error) => {
          if (!error || !error.message || error.message.trim() === '') {
            this._snackBar.open('New product has been added to the shop.', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'right'
            });
          } else {
            this._snackBar.open('Failed to add the new product. Please try again later.', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'right'
            });
          }
        }
      );
    } else {
      this._snackBar.open('Form is invalid. Please check the entered values.', 'Dismiss', {
        duration: 3000,
        horizontalPosition: 'right'
      });
    }
  }
}
