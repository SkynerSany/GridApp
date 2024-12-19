import {Component, memo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ColDef, ICellRendererParams} from 'ag-grid-community';
import {IOrderProduct, IOrdersGridRowData, IOrdersGridState} from "./orders-grid.types";
import {Button} from "react-bootstrap";
import ModalCustom from "../../widgets/modal/modal";

const GridMemo = memo(({columnDefs, rowData}: { columnDefs: ColDef[], rowData: IOrdersGridRowData[] }) => {
  return <AgGridReact
    columnDefs={columnDefs}
    rowData={rowData}
    pagination={true}
    paginationPageSize={20}
  />
})

async function getProductsData(productsList: IOrderProduct[]) {
  return await Promise.all(
    productsList.map(product =>
      fetch(`http://localhost:5000/api/products/${product.productId}`)
        .then(res => res.json())
        .then(data => {
          return {...data, quantity: product.quantity}
        })
    ))
}

export default class OrdersGrid extends Component<{}, IOrdersGridState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rowData: [],
      showModal: false,
      productsData: []
    };
  }

  columnDefs: ColDef[] = [
    {field: "orderId", headerName: "Order ID", sortable: true, filter: true},
    {field: "userId", headerName: "User ID", sortable: true, filter: true},
    {field: "total", headerName: "Total", sortable: true, filter: true},
    {field: "status", headerName: "Status", sortable: true, filter: true},
    {field: "products", headerName: "Products", cellRenderer: this.CustomButtonComp.bind(this), sortable: false, filter: false},
  ];

  CustomButtonComp(props: ICellRendererParams) {
    return <Button size="sm" onClick={() => {
      getProductsData(props.value)
        .then((productsData) => {
          this.setState({productsData, showModal: true})
        })
    }}>Show products</Button>;
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(orders => this.setState({rowData: orders}))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }

  render() {
    return (
      <div className="ag-theme-alpine" style={{height: '100%', width: '100%'}}>
        {
          this.state.rowData ? <GridMemo columnDefs={this.columnDefs} rowData={this.state.rowData}/> : <div>Загрузка данных...</div>
        }
        <ModalCustom
          show={this.state.showModal}
          handleClose={() => this.setState({showModal: false})}
          rowData={this.state.productsData}
          type="products"
        />
      </div>
    );
  }
}