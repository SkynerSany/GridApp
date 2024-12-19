import {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ColDef, GetRowIdParams} from 'ag-grid-community';
import {IUsersGridState} from "./users-grid.types";
import {Button} from "react-bootstrap";

class UsersGrid extends Component<{}, IUsersGridState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rowData: null,
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
    {field: "profilePreferencesNotifications", headerName: "Notifications", sortable: true, filter: true, type: "booleanColumn", editable: true, flex: 1},
  ];

  componentDidMount() {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(users => this.setState({rowData: users}))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }

  addNewUser() {
    const id = prompt('Enter user id');
    if (id === '') return;

    fetch(`http://localhost:5000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": id,
        "name": "Whitney Green",
        "email": "tmorgan@gomez-gonzales.com",
        "role": "Moderator",
        "profileAge": 40,
        "profileAddressStreet": "03324 Heather Route",
        "profileAddressCity": "Johnfurt",
        "profileAddressZipcode": "89209",
        "profilePreferencesTheme": "light",
        "profilePreferencesNotifications": true
      })
    })
      .then(response => response.json())
      .then(users => Array.isArray(users) ? this.setState({rowData: users}) : console.log(users))
      .catch(error => console.log(error));
  }

  editUser() {
    const id = prompt('Enter user id');
    if (id === '') return;

    fetch(`http://localhost:5000/api/users/${ id }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": id,
        "name": "Whitney Grefg",
        "email": "tmorgan@gomez-gonzales.com",
        "role": "Moderator",
        "profileAge": 40,
        "profileAddressStreet": "03324 Heather Route",
        "profileAddressCity": "Johnfurt",
        "profileAddressZipcode": "89209",
        "profilePreferencesTheme": "light",
        "profilePreferencesNotifications": true
      })
    })
      .then(response => response.json())
      .then(users => Array.isArray(users) ? this.setState({rowData: users}) : console.log(users))
      .catch(error => console.log(error));
  }

  getRowId = (params: GetRowIdParams)=> params.data.id

  render() {
    return (
      <>
        <div className="ag-theme-alpine" style={{height: '80%', width: '100%'}}>
          {
            this.state.rowData ? (
              <AgGridReact
                columnDefs={this.columnDefs}
                rowData={this.state.rowData}
                pagination={true}
                paginationPageSize={20}
                getRowId={this.getRowId}
              />
            ) : (
              <div>Загрузка данных...</div>
            )}
        </div>
        <Button onClick={() => this.addNewUser()} className="my-2 mx-3">Add new user</Button>
        <Button onClick={() => this.editUser()}>Edit user</Button>
      </>
    );
  }
}

export default UsersGrid;