import {AgGridReact} from "ag-grid-react";
import {ColDef, GridApi} from "ag-grid-community";
import {IProductsGridRowData} from "../../pages/products-grid/products-grid.types";
import {IUsersGridRowData} from "../../pages/users-grid/users-grid.types";
import {Button} from "react-bootstrap";

const emptyUserObject = {
  "id": "",
  "name": "",
  "email": "",
  "role": "",
  "profileAge": "",
  "profileAddressStreet": "",
  "profileAddressCity": "",
  "profileAddressZipcode": "",
  "profilePreferencesTheme": "",
  "profilePreferencesNotifications": false
}

const productsColumnDefs: ColDef[] = [
  {field: "productId", headerName: "Product ID", sortable: true, filter: true, flex: 1},
  {field: "name", headerName: "Name", sortable: true, filter: true, flex: 1},
  {field: "price", headerName: "Price", sortable: true, filter: true, flex: 1},
  {field: "quantity", headerName: "Quantity", sortable: true, filter: true, flex: 1},
];

const userColumnDefs: ColDef[] = [
  {field: "id", headerName: "ID", sortable: true, filter: true, editable: true, flex: 1},
  {field: "name", headerName: "Name", sortable: true, filter: true, enableCellChangeFlash: true, editable: true, flex: 2},
  {field: "email", headerName: "Email", sortable: true, filter: true, enableCellChangeFlash: true, editable: true, flex: 3},
  {field: "role", headerName: "Role", sortable: true, filter: true, enableCellChangeFlash: true, editable: true, flex: 2},
  {field: "profileAge", headerName: "Age", sortable: true, filter: true, editable: true, flex: 1},
  {field: "profileAddressStreet", headerName: "Street Address", sortable: true, filter: true, editable: true, flex: 2},
  {field: "profileAddressCity", headerName: "City", sortable: true, filter: true, editable: true, flex: 2},
  {field: "profileAddressZipcode", headerName: "Zipcode", sortable: true, filter: true, editable: true, flex: 1},
  {field: "profilePreferencesTheme", headerName: "Theme", sortable: true, filter: true, editable: true, flex: 1},
  {field: "profilePreferencesNotifications", headerName: "Notifications", sortable: true, filter: true, type: "booleanColumn", editable: true, flex: 1},
];

const modalType = {
  products: (rowData: IProductsGridRowData[], pagination: boolean = true, paginationPageSize: number = 20) => {
    return (
      <div className="ag-theme-alpine" style={{width: '100%'}}>
        <AgGridReact
          columnDefs={productsColumnDefs}
          rowData={rowData}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          domLayout='autoHeight'
        />
      </div>
    )
  },
  user: (rowData: IUsersGridRowData[], pagination: boolean = true, paginationPageSize: number = 20, updateUserData: ((userData: IUsersGridRowData) => void)) => {
    let gridApi: GridApi | null = null;

    return (
      <div className="ag-theme-alpine" style={{width: '100%'}}>
        <AgGridReact
          columnDefs={userColumnDefs}
          rowData={rowData}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          domLayout='autoHeight'
          onGridReady={(event) => gridApi = event.api}
        />
        <Button onClick={() => gridApi?.forEachNode((node) => updateUserData(node.data))}>Send</Button>
      </div>
    )
  },
  emptyUser: (updateUserData: ((userData: IUsersGridRowData) => void)) => {
    let gridApi: GridApi | null = null;

    return (
      <div className="ag-theme-alpine" style={{width: '100%'}}>
        <AgGridReact
          columnDefs={userColumnDefs}
          rowData={[{...emptyUserObject}]}
          pagination={false}
          domLayout='autoHeight'
          onGridReady={(event) => gridApi = event.api}
        />
        <Button onClick={() => gridApi?.forEachNode((node) => updateUserData(node.data))}>Send</Button>
      </div>
    )
  }
}

export default modalType;