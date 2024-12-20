import {IUsersGridRowData} from "../../pages/users-grid/users-grid.types";

export const EDIT_USER = "EDIT_USER";

export function editUserData(user: IUsersGridRowData) {
  return { type: EDIT_USER, user }
}