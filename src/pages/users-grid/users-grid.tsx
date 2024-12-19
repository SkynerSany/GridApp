import {Component, memo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ColDef, GetRowIdParams} from 'ag-grid-community';
import {IUsersGridMemo, IUsersGridRowData, IUsersGridState} from "./users-grid.types";
import {Button} from "react-bootstrap";
import ModalCustom from "../../widgets/modal/modal";

function editUser(userData: IUsersGridRowData, updateRowData: (rowData: IUsersGridRowData[]) => void) {
  fetch(`http://localhost:5000/api/users/${userData?.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(rowData => updateRowData(rowData))
    .catch(error => console.log(error));
}

function addNewUser(userData: IUsersGridRowData, updateRowData: (rowData: IUsersGridRowData[]) => void) {
  fetch(`http://localhost:5000/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(rowData => updateRowData(rowData))
    .catch(error => console.log(error));
}

const GridMemo = memo(({columnDefs, rowData, btnEditActive}: IUsersGridMemo) => {
  return <AgGridReact
    columnDefs={columnDefs}
    rowData={rowData}
    pagination={true}
    paginationPageSize={20}
    getRowId={(params: GetRowIdParams) => params.data.id}
    rowSelection={'single'}
    onRowSelected={(event) => btnEditActive(true, event.api.getSelectedRows()[0])}
  />
})

class UsersGrid extends Component<{}, IUsersGridState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rowData: [],
      btnEditIsActive: false,
      showModal: false,
      selectedRowData: null,
      modalType: 'user'
    };
  }

  columnDefs: ColDef[] = [
    {field: "id", headerName: "ID", sortable: true, filter: true, flex: 1},
    {field: "name", headerName: "Name", sortable: true, filter: true, enableCellChangeFlash: true, flex: 2},
    {field: "email", headerName: "Email", sortable: true, filter: true, enableCellChangeFlash: true, flex: 3},
    {field: "role", headerName: "Role", sortable: true, filter: true, enableCellChangeFlash: true, flex: 2},
    {field: "profileAge", headerName: "Age", sortable: true, filter: true, flex: 1},
    {field: "profileAddressStreet", headerName: "Street Address", sortable: true, filter: true, flex: 2},
    {field: "profileAddressCity", headerName: "City", sortable: true, filter: true, flex: 2},
    {field: "profileAddressZipcode", headerName: "Zipcode", sortable: true, filter: true, flex: 1},
    {field: "profilePreferencesTheme", headerName: "Theme", sortable: true, filter: true, flex: 1},
    {
      field: "profilePreferencesNotifications",
      headerName: "Notifications",
      sortable: true,
      filter: true,
      type: "booleanColumn",
      flex: 1
    },
  ];

  componentDidMount() {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(users => this.setState({rowData: users}))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }

  btnEditActive(isActive: boolean, selectedRowData: IUsersGridRowData) {
    this.setState({btnEditIsActive: isActive, selectedRowData: selectedRowData});
  }

  updateUserData(userData: IUsersGridRowData) {
    switch (this.state.modalType) {
      case 'user': editUser(userData, (rowData) => this.setState({rowData: rowData})); break;
      case "emptyUser": addNewUser(userData, (rowData) => this.setState({rowData: rowData})); break;
    }

    this.setState({showModal: false})
  }

  render() {

    return (
      <>
        <div className="ag-theme-alpine" style={{height: '80%', width: '100%'}}>
          {
            this.state.rowData ?
              <GridMemo columnDefs={this.columnDefs} rowData={this.state.rowData} btnEditActive={this.btnEditActive.bind(this)}/> :
              <div>Загрузка данных...</div>
          }
        </div>
        <Button onClick={() => this.setState({showModal: true, modalType: 'emptyUser'})} className="my-2 mx-3">Add new user</Button>
        <Button
          onClick={() => this.setState({showModal: true, modalType: 'user'})}
          active={this.state.btnEditIsActive}
        >Edit user</Button>

        <ModalCustom
          show={this.state.showModal}
          handleClose={() => this.setState({showModal: false})}
          rowData={[this.state.selectedRowData as IUsersGridRowData]}
          updateUserData={this.updateUserData.bind(this)}
          type={this.state.modalType}
        />
      </>
    );
  }
}

export default UsersGrid;