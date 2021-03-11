import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ResponseInterface from 'src/app/interfaces/response.interface';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  

  constructor(
    public _products: ProductsService,
    public _user: UserService,
    public _fb: FormBuilder, 
    public _r: Router
  ) { }

  ngOnInit(): void {
    this._products.productForm = this._fb.group({
      productName: [this._products.productNameINP, [Validators.required]],
      category: [this._products.productCategoryINP, [Validators.required]],
      price: [this._products.productPriceINP, [Validators.required]],
      image: [this._products.productImageINP, [Validators.required]]
    })
    
    this._products.getCategories().subscribe(
      (res: ResponseInterface) => {
        this._products.productsCategoriesArr = res.categories 
      },
      (err: ResponseInterface) => {
        console.log(err);
        this._r.navigateByUrl('welcome/login')
      }
    )
  }


  public handleSubmit(formData: any, formDirective: FormGroupDirective){
    const body = {
      name: this._products.productForm.value.productName, 
      category_id: this._products.productForm.value.category,
      price: this._products.productForm.value.price,
      image: this._products.productForm.value.image,
    }
    if (this._products.formStatus === "add"){
      this._products.addProduct(body).subscribe(
        (res:ResponseInterface)=>{
          this._products.productsItemsArr = res.products
        },
        (err:ResponseInterface)=>{
          console.log(err);
          this._r.navigateByUrl('/welcome')
        }
      )
    }else{
      this._products.editProduct(this._products.productIdToEdit,body).subscribe(
        (res:ResponseInterface)=>{
          const productToEdit = this._products.productsItemsArr.find(p=> p.id === this._products.productIdToEdit)
          
          productToEdit.name = res.productItem[0].name
          productToEdit.category_id = res.productItem[0].category_id
          productToEdit.price = res.productItem[0].price
          productToEdit.image = res.productItem[0].image
        },
        (err:ResponseInterface)=>{
          console.log(err);
          this._r.navigateByUrl('/welcome')
        }
      )
    }
    formDirective.resetForm();
    this._products.productForm.reset()
    this._products.formStatus = "add"
  }
}
