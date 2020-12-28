import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { cloneDeep } from 'lodash';
const initialState = {
  supervisions: null,
  loading: false,
  error: null,
  soup: null,
};
const clearSupervisions = (state, action) => {
  return updateObject(state, { supervisions: null });
};
const fetchSupervisionsStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchSupervisionsSuccess = (state, action) => {
  return updateObject(state, {
    supervisions: action.supervisions,
    loading: false,
  });
};
const fetchSupervisionsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const fetchSoupStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchSoupSuccess = (state, action) => {
  return updateObject(state, {
    soup: action.soup,
    loading: false,
  });
};
const fetchSoupFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const deleteSoupStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const deleteSoupSuccess = (state, action) => {
  const updatedSupervisions = cloneDeep(state.supervisions);
  const index = updatedSupervisions.findIndex((soup) => {
    return soup.id === action.soupId;
  });
  updatedSupervisions.splice(index, 1);
  return updateObject(state, {
    supervisions: updatedSupervisions,
    loading: false,
  });
};
const deleteSoupFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUPERVISIONS_START:
      return fetchSupervisionsStart(state, action);
    case actionTypes.FETCH_SUPERVISIONS_SUCCESS:
      return fetchSupervisionsSuccess(state, action);
    case actionTypes.FETCH_SUPERVISIONS_FAIL:
      return fetchSupervisionsFail(state, action);
    case actionTypes.FETCH_SOUP_START:
      return fetchSoupStart(state, action);
    case actionTypes.FETCH_SOUP_SUCCESS:
      return fetchSoupSuccess(state, action);
    case actionTypes.FETCH_SOUP_FAIL:
      return fetchSoupFail(state, action);

    case actionTypes.DELETE_SOUP_START:
      return deleteSoupStart(state, action);
    case actionTypes.DELETE_SOUP_SUCCESS:
      return deleteSoupSuccess(state, action);
    case actionTypes.DELETE_SOUP_FAIL:
      return deleteSoupFail(state, action);

    case actionTypes.CLEAR_SUPERVISIONS:
      return clearSupervisions(state, action);
    default:
      return state;
  }
};

export default reducer;
