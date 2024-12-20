import {EDIT_USER} from "../actions";
import {IUsersGridRowData} from "../../../pages/users-grid/users-grid.types";

const initialState = {}

export default function usersReduser(state = initialState, action: { type: string, user: IUsersGridRowData }) {
  switch (action.type) {
    case EDIT_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}