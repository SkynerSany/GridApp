import {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ColDef} from 'ag-grid-community';
import {IUsersGridState} from "./users-grid.types";
import {Button} from "react-bootstrap";

function editUser(id: number) {
  fetch(`http://localhost:5000/api/users/${ id }`, {
    method: 'PUT',
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
      "profile.preferencesTheme": "light",
      "profilePreferencesNotifications": true
    })
  })
    // .then(response => console.log(response.json()))
    .catch(error => console.log(error));
}

class UsersGrid extends Component<{}, IUsersGridState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rowData: null,
    };
  }

  columnDefs: ColDef[] = [
    {field: "id", headerName: "ID", sortable: true, filter: true},
    {field: "name", headerName: "Name", sortable: true, filter: true},
    {field: "email", headerName: "Email", sortable: true, filter: true},
    {field: "role", headerName: "Role", sortable: true, filter: true},
    {field: "profileAge", headerName: "Age", sortable: true, filter: true},
    {field: "profileAddressStreet", headerName: "Street Address", sortable: true, filter: true},
    {field: "profileAddressCity", headerName: "City", sortable: true, filter: true},
    {field: "profileAddressZipcode", headerName: "Zipcode", sortable: true, filter: true},
    {field: "profilePreferencesTheme", headerName: "Theme", sortable: true, filter: true},
    {field: "profilePreferencesNotifications", headerName: "Notifications", sortable: true, filter: true, type: "booleanColumn"},
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
              />
            ) : (
              <div>Загрузка данных...</div>
            )}
        </div>
        <Button onClick={() => this.addNewUser()}>Add new user</Button>
      </>
    );
  }
}

export default UsersGrid;