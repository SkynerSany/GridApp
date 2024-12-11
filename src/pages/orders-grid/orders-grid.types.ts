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
  productsData: any;
}

export interface IModalOrders {
  show: boolean,
  handleClose: () => void,
  productsData: IOrderProduct[]
}