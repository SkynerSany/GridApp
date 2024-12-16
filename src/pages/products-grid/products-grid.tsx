import { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { IProductsGridState } from "./products-grid.types";

class ProductsGrid extends Component<{}, IProductsGridState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rowData: null,
    };
  }

  columnDefs: ColDef[] = [
    { field: "productId", headerName: "Product ID", sortable: true, filter: true },
    { field: "name", headerName: "Name", sortable: true, filter: true },
    { field: "category", headerName: "Category", sortable: true, filter: true },
    { field: "price", headerName: "Price", sortable: true, filter: true, type: "numericColumn" },
    { field: "stock", headerName: "Stock", sortable: true, filter: true, type: "numericColumn" },
    { field: "detailsBrand", headerName: "Brand", sortable: true, filter: true },
    { field: "detailsSpecificationsFeature1", headerName: "Feature 1", sortable: true, filter: true },
    { field: "detailsSpecificationsFeature2", headerName: "Feature 2", sortable: true, filter: true },
    { field: "detailsSpecificationsFeature3", headerName: "Feature 3", sortable: true, filter: true },
  ];

  componentDidMount() {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(products => this.setState({ rowData: products }))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }

  render() {
    return (
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        {
          this.state.rowData ? (
            <AgGridReact
              columnDefs={this.columnDefs}
              rowData={this.state.rowData}
              pagination={true}
              paginationPageSize={20}
            />
          ) : (
          <div>Загрузка данных...</div>
        )}
      </div>
    );
  }
}

export default ProductsGrid;