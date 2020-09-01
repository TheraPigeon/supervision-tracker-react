import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  members: [],
  loading: false,
};
const fetchMembersStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchMembersSuccess = (state, action) => {
  return updateObject(state, {
    members: action.members,
    loading: false,
  });
};
const fetchMembersFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MEMBERS_START:
      return fetchMembersStart(state, action);
    case actionTypes.FETCH_MEMBERS_SUCCESS:
      return fetchMembersSuccess(state, action);
    case actionTypes.FETCH_MEMBERS_FAIL:
      return fetchMembersFail(state, action);
    default:
      return state;
  }
};
export default reducer;
