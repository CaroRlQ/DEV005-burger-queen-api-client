import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsI } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-modal-add-products',
  templateUrl: './modal-add-products.component.html',
  styleUrls: ['./modal-add-products.component.css']
})
export class ModalAddProductsComponent {

  idProduct: number = 0
  action: string = 'Agregar ';

  constructor(
    private productService: ProductsService,
    private toRouter: ActivatedRoute,
    private router: Router,
    private toast: ToastrService

  ) {

    this.idProduct = Number(toRouter.snapshot.paramMap.get('id'))
    if (this.idProduct !== 0) {
      this.action = 'Editar '
      this.getProductToEdit()

    }
  }
  // Método para obtener productos
  getProductToEdit() {
    this.productService.getProductById(this.idProduct).subscribe((data) => {
      this.formAddProduct.setValue({
        type: data.type,
        product: data.name,
        price: data.price ? String(data.price) : '',
      })
    })
  }



  // Creación de geters (*averiguar)
  get product() {
    return this.formAddProduct.get('product') as FormControl;
  }
  get price() {
    return this.formAddProduct.get('price') as FormControl;
  }
  get type() {
    return this.formAddProduct.get('type') as FormControl;
  }
  // Creación de grupo de formulario 
  formAddProduct = new FormGroup({
    'product': new FormControl('', Validators.required),
    'price': new FormControl('', Validators.required),
    'type': new FormControl('', Validators.required)
  })

  // Funcion para agregar o editar un producto; boton "agregar"
  processProduct() {
    console.log('hola')
    const productData: ProductsI = {
      id: 0,
      name: this.formAddProduct.value.product || '',
      price: this.formAddProduct.value.price ? parseInt(this.formAddProduct.value.price) : 0,
      image: '',
      type: this.formAddProduct.value.type || '',
      dateEntry: new Date()
    }
    if (this.idProduct !== 0) {
      productData.id = this.idProduct;
      this.productService.updateProduct(this.idProduct, productData).subscribe((data) => {

        this.toast.success(`${productData.name} se ha editado exitosamente`, '', {
          toastClass: 'success-toastSend',
        });
        this.router.navigate(['/manager/menu'])
        console.log('se ha actualizado...')
      })


    } else {
      productData.id = new Date().getTime()

      this.productService.addProduct(productData).subscribe(() => {
        this.toast.success(`${productData.name} se ha agregado exitosamente`, '', {
          toastClass: 'success-toastSend',
        });
        this.router.navigate(['/manager/menu'])
        console.log('producto añadido...')
      })

    }


  }




}
