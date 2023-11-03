import { Component, Input } from '@angular/core';
import { UserItemsI } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsI } from 'src/app/interfaces/products.interface';
import { ActivatedRoute } from '@angular/router';

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
 
  constructor(
    private userService: UsersService,
    private itemProductService: ProductsService,
    private toRouter : ActivatedRoute
    ) {

 

  }
  ngOnInit(): void {
    this.setPropertyToShow();
    this.getUserItem();
    this.getProductsItem();
    this.getProductByType();
    this.setPropertyToShow();
  }
  // Función para traer usuarios
  getUserItem() {
    this.userService.getUser().subscribe(result => {
      this.userItem = result;
      console.log('user', result)
      this.getUserByType();
      this.setPropertyToShow() 
    })
  };
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

  getUserByType(): UserItemsI[] {
    // console.log('types', this.userService.getUsersByType('waiter', this.userItem))
    return this.userService.getUsersByType(this.dataType, this.userItem);
  }


  // Función de variable de propiedad de objeto

  setPropertyToShow() {
    if (this.dataItem === 'users') {
      this.propertyObject = 'email';
      this.showItems = this.getUserByType();
      // console.log('peeta', this.showItems)
    } else if (this.dataItem === 'products') {
      this.propertyObject = 'name';
      this.showItems = this.getProductByType();
      // console.log('katniss', this.showItems)
    };
  };

  

  // funciones de botones
  editItem(item:object) {
    console.log('editando...',item)
    

  }
  deleteElment(id:number) {

    this.userService.deleteUser(id).subscribe(()=>{

     this.getUserItem()
    })
    
    

  }


}

