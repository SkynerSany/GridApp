interface IUsersGridRowData {
  id: number;
  name: string;
  age: number;
  country: string;
  salary: number;
  email: string;
  hire_date: string;
  department: string;
}

export interface IUsersGridState {
  rowData: IUsersGridRowData[] | null;
}