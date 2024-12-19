import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import {IProductsGridRowData} from "../../pages/products-grid/products-grid.types";

const productsColumnDefs: ColDef[] = [
  {field: "productId", headerName: "Product ID", sortable: true, filter: true, flex: 1},
  {field: "name", headerName: "Name", sortable: true, filter: true, flex: 1},
  {field: "price", headerName: "Price", sortable: true, filter: true, flex: 1},
  {field: "quantity", headerName: "Quantity", sortable: true, filter: true, flex: 1},
];

const modalType = {
  products: (rowData: IProductsGridRowData[], pagination: boolean = true, paginationPageSize: number = 20) => {
    return (
      <div className="ag-theme-alpine" style={{width: '100%'}}>
        <AgGridReact
          columnDefs={productsColumnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={20}
          domLayout='autoHeight'
        />
      </div>
    )
  }
}

export default modalType;