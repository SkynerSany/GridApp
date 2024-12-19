import {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {IModalCustom} from "./modal.types";
import modalType from "./modal-variants";
import {IProductsGridRowData} from "../../pages/products-grid/products-grid.types";
import {IUsersGridRowData} from "../../pages/users-grid/users-grid.types";

export default class ModalCustom extends Component<IModalCustom> {
  render() {
    let {show, handleClose, rowData, type, pagination, paginationPageSize, updateUserData} = this.props;
    let headerName ='';

    function checkModalType() {
      switch (type) {
        case 'products': {
          headerName = 'Products';
          return modalType[type](rowData as IProductsGridRowData[], pagination, paginationPageSize)
        }
        case 'user': {
          headerName = 'User';
          if(updateUserData) return modalType[type](rowData as IUsersGridRowData[], pagination, paginationPageSize, updateUserData)
          break;
        }
        case 'emptyUser': {
          headerName = 'New User';
          if(updateUserData) return modalType[type](updateUserData)
          break;
        }
      }
    }

    return (
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{headerName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            checkModalType()
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