import {IProductsGridRowData} from "../../pages/products-grid/products-grid.types";

export interface IModalOrders {
  show: boolean,
  handleClose: () => void,
  rowData: IProductsGridRowData[],
  type: 'products',
  pagination?: boolean,
  paginationPageSize?: 20
}