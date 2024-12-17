import {IProductsGridState} from "../products-grid/products-grid.types";

interface IOrderProduct {
  productId: string;
  quantity: number;
}

interface IOrdersGridRowData {
  orderId: string;
  userId: number;
  products: IOrderProduct[];
  total: number;
  status: string;
}

export interface IOrdersGridState {
  rowData: IOrdersGridRowData[] | null;
  showModal: boolean;
  productsData: [] | IProductsGridState[];
}

export interface IModalOrders {
  show: boolean,
  handleClose: () => void,
  productsData: [] | IProductsGridState[]
}