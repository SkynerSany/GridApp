import {IProductsGridRowData} from "../products-grid/products-grid.types";

export interface IOrderProduct {
  productId: string;
  quantity: number;
}

export interface IOrdersGridRowData {
  orderId: string;
  userId: number;
  products: IOrderProduct[];
  total: number;
  status: string;
}

export interface IOrdersGridState {
  rowData: IOrdersGridRowData[] | null;
  showModal: boolean;
  productsData: [] | IProductsGridRowData[];
}