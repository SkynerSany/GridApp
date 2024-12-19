import {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {IModalOrders} from "./modal.types";
import modalType from "./modal-variants";

export default class ModalCustom extends Component<IModalOrders> {
  render() {
    let {show, handleClose, rowData, type, pagination, paginationPageSize} = this.props;

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
        <Modal.Body>
          {
            modalType[type](rowData, pagination, paginationPageSize)
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}