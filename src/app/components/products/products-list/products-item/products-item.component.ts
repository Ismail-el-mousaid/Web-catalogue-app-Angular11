import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {ActionEvent, ProductActionsTypes} from '../../../../state/product.state';
import {EventDriverService} from '../../../../state/event.driver.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

   @Input() product?: Product;
  // @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();


  constructor(private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
   // this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT, parametre: product});
    this.eventDriverService.publishEvent({type:ProductActionsTypes.SELECT_PRODUCT, parametre: product});
  }

  onDelete(product: Product) {
    // this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT, parametre: product});
    this.eventDriverService.publishEvent({type:ProductActionsTypes.DELETE_PRODUCT, parametre: product});
  }

  onEdit(product: Product) {
    // this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT, parametre: product});
    this.eventDriverService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCT, parametre: product});
  }
}
