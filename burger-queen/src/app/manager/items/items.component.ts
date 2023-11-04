import { Component, Input, Output } from '@angular/core';
import { UserItemsI } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsI } from 'src/app/interfaces/products.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  @Input() dataItem: string = '';
  @Input() dataType: string = '';

  userItem: UserItemsI[] = [];
  productsItem: ProductsI[] = [];
  propertyObject: string = '';
  showItems: any[] = [];
  quantityProduct: object = {};
  modalSwitch: boolean = false;
  itemId: number = 0

  constructor(
    private userService: UsersService,
    private itemProductService: ProductsService,
    private toRouter: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private modalSs: ModalService
  ) {

    this.modalSs.$modal.subscribe((valor) => {
      this.modalSwitch = valor;
    })



  }
  ngOnInit(): void {
    this.getUserItem();
    this.getProductsItem();
    this.setPropertyToShow();
  }
  // Función para traer usuarios
  getUserItem() {
    this.userService.getUser().subscribe(result => {
      this.userItem = result;
      this.getUserByType();
      this.setPropertyToShow()
    })
  };
  // Función para extraer usuarios por tipos
  getUserByType(): UserItemsI[] {
    return this.userService.getUsersByType(this.dataType, this.userItem);
  }


  // Función para traer productos de menú
  getProductsItem() {
    this.itemProductService.getProductsFromAPI().subscribe(result => {
      this.productsItem = result;
      this.getProductByType();
      this.setPropertyToShow()
    })
  }

  getProductByType() {
    return this.itemProductService.getProductsByType(this.dataType, this.productsItem);
  }

  // Función de variable de propiedad de objeto

  setPropertyToShow() {
    if (this.dataItem === 'users') {
      this.propertyObject = 'email';
      this.showItems = this.getUserByType();
    } else if (this.dataItem === 'products') {
      this.propertyObject = 'name';
      this.showItems = this.getProductByType();
    };
  };
  // Función para eliminar usuario (boton 'eliminar')
  openModalDelete(id: number) {

    this.modalSwitch = true;
    this.modalSs.$id.emit(id)
    this.modalSs.$dataItem.emit(this.dataItem);
    this.itemId = id;


    console.log('id: ', id)
    console.log('dataItem :', this.dataItem)


  }

  deleteItem() {
   console.log('probando evento en item')
    if (this.dataItem === "users") {
      this.userService.deleteUser(this.itemId).subscribe(() => {
        this.getUserItem()
      })
    } else {
      this.productService.deleteProduct(this.itemId).subscribe(() => {
        this.getProductsItem()
        console.log('borrando producto...')
      })
    }

  }

  getEditRoute(id: number) {
    if (this.dataItem === 'users') {
      return this.router.navigate([`/manager/edit/${id}`])
    } else if (this.dataItem === 'products') {
      return this.router.navigate([`/manager/edit-product/${id}`])
    }
    return this.router.navigate(['/manager'])
  }
}

