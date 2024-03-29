
export enum ProductActionsTypes{
  GET_ALL_PRODUCTS="[Product] Get All products",
  GET_SELECTED_PRODUCTS="[Product] Get Selected products",
  GET_AVAILABLE_PRODUCTS="[Product] Get Available products",
  SEARCH_PRODUCTS="[Product] Search products",
  NEW_PRODUCTS="[Product] New product",
  SELECT_PRODUCT="[Product] Select product",
  EDIT_PRODUCT="[Product] Edit product",
  DELETE_PRODUCT="[Product] Delete product",
  PRODUCT_ADDED="[Product] Add product",
  PRODUCT_UPDATED="[Product] Update product"
}

export interface ActionEvent {
  type: ProductActionsTypes,
  parametre?: any   // ? cad on n'est pas obligé de spécifier parametre
}

export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T>{
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string
}
