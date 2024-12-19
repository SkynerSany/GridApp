import {ColDef} from "ag-grid-community";

export interface IUsersGridRowData {
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
  rowData: IUsersGridRowData[] | [];
  btnEditIsActive: boolean;
  showModal: boolean;
  selectedRowData: null | IUsersGridRowData;
  modalType: 'user' | 'emptyUser';
}

export interface IUsersGridMemo {
  columnDefs: ColDef[],
  rowData:  IUsersGridRowData[],
  btnEditActive: (isActive: boolean, selectedRowData: IUsersGridRowData) => void
}
