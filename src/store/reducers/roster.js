import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
};

const createStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const createStaffSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};
const createStaffFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const addStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const addStaffSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};
const addStaffFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_STAFF_START:
      return createStaffStart(state, action);
    case actionTypes.CREATE_STAFF_SUCCESS:
      return createStaffSuccess(state, action);
    case actionTypes.CREATE_STAFF_FAIL:
      return createStaffFail(state, action);
    case actionTypes.ADD_STAFF_START:
      return addStaffStart(state, action);
    case actionTypes.ADD_STAFF_SUCCESS:
      return addStaffSuccess(state, action);
    case actionTypes.ADD_STAFF_FAIL:
      return addStaffFail(state, action);
    default:
      return state;
  }
};

export default reducer;
