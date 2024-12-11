import { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { IUsersGridState } from "./users-grid.types";

class UsersGrid extends Component<{}, IUsersGridState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rowData: null,
    };
  }

  columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", sortable: true, filter: true },
    { field: "name", headerName: "Name", sortable: true, filter: true },
    { field: "email", headerName: "Email", sortable: true, filter: true },
    { field: "role", headerName: "Role", sortable: true, filter: true },
    { field: "profileAge", headerName: "Age", sortable: true, filter: true },
    { field: "profileAddressStreet", headerName: "Street Address", sortable: true, filter: true },
    { field: "profileAddressCity", headerName: "City", sortable: true, filter: true },
    { field: "profileAddressZipcode", headerName: "Zipcode", sortable: true, filter: true },
    { field: "profilePreferencesTheme", headerName: "Theme", sortable: true, filter: true },
    { field: "profilePreferencesNotifications", headerName: "Notifications", sortable: true, filter: true, type: "booleanColumn" },
  ];

  componentDidMount() {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => this.setState({ rowData: data.users }))
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

export default UsersGrid;