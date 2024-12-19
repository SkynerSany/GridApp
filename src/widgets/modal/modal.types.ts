import {IProductsGridRowData} from "../../pages/products-grid/products-grid.types";
import {IUsersGridRowData} from "../../pages/users-grid/users-grid.types";

export interface IModalCustom {
  show: boolean,
  handleClose: () => void,
  rowData: IProductsGridRowData[] | IUsersGridRowData[],
  type: 'products' | 'user' | 'emptyUser',
  pagination?: boolean,
  paginationPageSize?: 20,
  updateUserData?: (userData: IUsersGridRowData) => void,
}