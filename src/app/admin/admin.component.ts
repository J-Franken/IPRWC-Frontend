import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {v4 as uuidv4} from "uuid";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  addForm!: FormGroup
  editForm!: FormGroup;
  selectedProductId!: number;
  productSub!: Subscription;
  showForm: boolean = false;
  showEditForm: boolean = false;
  buttonState: boolean = false;
  products: Product[] = [];

  constructor(private productService: ProductService, private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.loadProducts();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.buttonState = !this.buttonState;
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

  loadProducts() {
    this.productService.getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }

  editProduct(productId: number): void {
    this.selectedProductId = productId;
    this.productService.getSelectedProduct(productId).subscribe(
      (product: Product) => {
        this.editForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price
        });
      });

    Swal.fire({
      title: 'Editing Product',
      html: `
        <form id="editProductForm">
          <div class="form-group">
            <label for="productName">Product name:</label>
            <input type="text" id="productName" class="swal2-input" required>
          </div>
          <div class="form-group">
            <label for="productDescription">Description:</label>
            <textarea id="productDescription" class="swal2-textarea" required></textarea>
          </div>
          <div class="form-group">
            <label for="productPrice">Product price:</label>
            <input type="number" id="productPrice" class="swal2-input" min="0" required>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const productName = (<HTMLInputElement>document.getElementById('productName')).value;
        const productDescription = (<HTMLInputElement>document.getElementById('productDescription')).value;
        const productPrice = parseFloat((<HTMLInputElement>document.getElementById('productPrice')).value);
        const updatedProduct: Product = {
          id: productId,
          name: productName,
          description: productDescription,
          price: productPrice
        };
        return this.productService.updateProduct(updatedProduct).toPromise();
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire('Success!', 'Product updated successfully!', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Failed to update product.', 'error');
      console.error('Error updating product:', error);
    });
  }

  deleteProduct(product: Product) {
    const confirmDelete = confirm(`Are you sure you want to delete ${product.name}?`);
    if (confirmDelete) {
      this.products = this.products.filter(p => p !== product);
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          this._snackBar.open('Product has been deleted.', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        }
      );
    }
  }
}
