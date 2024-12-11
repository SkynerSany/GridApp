interface IProductsGridRowData {
  productId: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  detailsBrand: string;
  detailsSpecificationsFeature1: string;
  detailsSpecificationsFeature2: string;
  detailsSpecificationsFeature3: string;
}

export interface IProductsGridState {
  rowData: IProductsGridRowData[] | null;
}