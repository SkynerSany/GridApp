import {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ColDef, ICellRendererParams} from 'ag-grid-community';
import {IModalOrders, IOrdersGridState} from "./orders-grid.types";
import {Button, Modal} from "react-bootstrap";

class ModalGrid extends Component<IModalOrders> {
  columnDefs: ColDef[] = [
    {field: "productId", headerName: "Product ID", sortable: true, filter: true, flex: 1},
    {field: "name", headerName: "Name", sortable: true, filter: true, flex: 1},
    {field: "price", headerName: "Price", sortable: true, filter: true, flex: 1},
    {field: "quantity", headerName: "Quantity", sortable: true, filter: true, flex: 1},
  ];

  render() {
    let {show, handleClose, productsData} = this.props;
    console.log(productsData);

    return (
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>{
          <div className="ag-theme-alpine" style={{height: '400px', width: '100%'}}>
            <AgGridReact
              columnDefs={this.columnDefs}
              rowData={productsData}
              pagination={true}
              paginationPageSize={20}
            />
          </div>
        }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

class OrdersGrid extends Component<{}, IOrdersGridState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rowData: null,
      showModal: false,
      productsData: []
    };
  }

  columnDefs: ColDef[] = [
    {field: "orderId", headerName: "Order ID", sortable: true, filter: true, width: 120},
    {field: "userId", headerName: "User ID", sortable: true, filter: true, width: 120},
    {field: "total", headerName: "Total", sortable: true, filter: true, width: 120},
    {field: "status", headerName: "Status", sortable: true, filter: true, width: 120},
    {
      field: "products",
      headerName: "Products",
      cellRenderer: this.CustomButtonComp.bind(this),
      sortable: false,
      filter: false,
      autoHeight: true
    },
  ];

  CustomButtonComp(props: ICellRendererParams) {
    async function getProductsData() {
      return await Promise.all(
        [...props.value].map(product =>
          fetch(`http://localhost:5000/api/products/${product.productId}`)
            .then(res => res.json())
            .then(data => {
              return {...data, quantity: product.quantity}
            })
        ))
    }

    return <Button size="sm" onClick={() => {
      getProductsData()
        .then((productsData) => {
          this.setState({productsData})
          this.setState({showModal: true})
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
        <ModalGrid
          show={this.state.showModal}
          handleClose={() => this.setState({showModal: false})}
          productsData={this.state.productsData}
        />
      </div>
    );
  }
}

export default OrdersGrid;