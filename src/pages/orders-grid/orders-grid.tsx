import { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {ColDef, ICellRendererParams} from 'ag-grid-community';
import {IModalOrders, IOrdersGridState} from "./orders-grid.types";
import {Button, Modal} from "react-bootstrap";

class ModalGrid extends Component<IModalOrders> {
  render() {
    let {show, handleClose, productsData} = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(productsData)}</Modal.Body>
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
      productsData: {}
    };
  }

  columnDefs: ColDef[] = [
    { field: "orderId", headerName: "Order ID", sortable: true, filter: true, width: 120 },
    { field: "userId", headerName: "User ID", sortable: true, filter: true, width: 120 },
    { field: "total", headerName: "Total", sortable: true, filter: true, width: 120 },
    { field: "status", headerName: "Status", sortable: true, filter: true, width: 120 },
    { field: "products", headerName: "Products", cellRenderer: this.CustomButtonComp.bind(this), sortable: false, filter: false, autoHeight: true },
  ];

  CustomButtonComp(props: ICellRendererParams) {
    return <Button size="sm" onClick={() => {
      this.setState({ showModal: true });
      this.setState({productsData: props.value});
    }}>Show products</Button>;
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(orders => this.setState({ rowData: orders }))
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
        <ModalGrid show={this.state.showModal} handleClose={() => this.setState({ showModal: false })} productsData={this.state.productsData} />
      </div>
    );
  }
}

export default OrdersGrid;