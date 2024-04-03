import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { PromocodeService } from '../services/promo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { Promo } from '../model/promo.model';
import {v4 as uuidv4} from "uuid";
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent {

  addForm!: FormGroup
  editForm!: FormGroup;
  selectedPromoId!: number;
  promoSub!: Subscription;
  showForm: boolean = false;
  showEditForm: boolean = false;
  buttonState: boolean = false;
  promoCodes: Promo[] = [];

  constructor(private promocodeService: PromocodeService, private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      discount_in_percentage: ['', Validators.required]
    });
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      discount_in_percentage: ['', Validators.required]
    });
    this.loadCoupons();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.buttonState = !this.buttonState;
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.promoSub = this.promocodeService.addPromoCode(new Promo(
        Number(uuidv4()),
        this.addForm.value.code,
        this.addForm.value.discount_in_percentage
        )
      ).subscribe(
        () => {
          this._snackBar.open('New coupon has been added to the shop.', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        },
        (error) => {
          if (!error || !error.message || error.message.trim() === '') {
            this._snackBar.open('New coupon has been added to the shop.', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'right'
            });
          } else {
            this._snackBar.open('Failed to add the new coupon. Please try again later.', 'Dismiss', {
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

  loadCoupons() {
    this.promocodeService.getAllPromoCodes()
      .subscribe((data: Promo[]) => {
        this.promoCodes = data;
      });
  }

  editCoupon(promoId: number): void {
    this.selectedPromoId = promoId;
    this.promocodeService.getSelectedCoupon(promoId).subscribe(
      (promo: Promo) => {
        this.editForm.patchValue({
          code: promo.code,
          discount_in_percentage: promo.discount_in_percentage
        });
      });

    Swal.fire({
      title: 'Editing Promo Code',
      html: `
        <form id="editPromoForm">
          <div class="form-group">
            <label for="promoCode">Code (at least 6 characters):</label>
            <input type="text" id="promoCode" class="swal2-input" required>
          </div>
          <div class="form-group">
            <label for="promoDiscountInPercentage">Discount(in %):</label>
            <input type="number" id="promoDiscountInPercentage" class="swal2-input" min="0" max="100" required>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const promoCode = (<HTMLInputElement>document.getElementById('promoCode')).value;
        const promoDiscountInPercentage = parseFloat((<HTMLInputElement>document.getElementById('promoDiscountInPercentage')).value);
        const updatedPromo: Promo = {
          id: promoId,
          code: promoCode,
          discount_in_percentage: promoDiscountInPercentage
        };
        return this.promocodeService.updatePromocode(updatedPromo).toPromise();
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire('Success!', 'Promocode updated successfully!', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Failed to update promocode.', 'error');
      console.error('Error updating promocode:', error);
    });
  }

  deleteCoupon(promo: Promo) {
    const confirmDelete = confirm(`Are you sure you want to delete ${promo.code}?`);
    if (confirmDelete) {
      this.promoCodes = this.promoCodes.filter(p => p !== promo);
      this.promocodeService.deletePromoCode(promo.id).subscribe(
        () => {
          this._snackBar.open('Coupon has been deleted.', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        }
      );
    }
  }
}
