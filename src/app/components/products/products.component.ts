import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../state/product.state';
import {Router} from '@angular/router';
import {EventDriverService} from '../../state/event.driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productsService:ProductsService, private router: Router,
              private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  /*  this.productsService.getAllProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })  */

    //Ecouter les evenements
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });

  }

  onGetAllProducts() {
    this.products$=this.productsService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelectedProducts() {
    this.products$=this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$=this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$=this.productsService.onSearchProduct(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p: Product) {
    let v = confirm("Etes vous sur?");
    if(v==true)
    this.productsService.delete(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProducts() {
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProducts();
        break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts();
        break;
      case ProductActionsTypes.SEARCH_PRODUCTS:
        this.onSearch($event.parametre);
        break;
      case ProductActionsTypes.NEW_PRODUCTS:
        this.onNewProducts();
        break;
      case ProductActionsTypes.SELECT_PRODUCT:
        this.onSelect($event.parametre);
        break;
      case ProductActionsTypes.DELETE_PRODUCT:
        this.onDelete($event.parametre);
        break;
      case ProductActionsTypes.EDIT_PRODUCT:
        this.onEdit($event.parametre);
        break;

    }
  }
}
