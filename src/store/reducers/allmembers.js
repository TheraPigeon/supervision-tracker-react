import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { cloneDeep } from 'lodash';
const initialState = {
  members: [],
  loading: false,
};

const createStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const createStaffSuccess = (state, action) => {
  const staffId = Object.keys(action.newStaff)[0];
  const formattedMember = cloneDeep(action.newStaff[staffId.toString()]);
  Object.assign(formattedMember, { id: staffId });
  const updatedMembers = cloneDeep(state.members);
  updatedMembers.staff_members.push(formattedMember);
  return updateObject(state, { loading: false, members: updatedMembers });
};
const createStaffFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
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

const editStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const editStaffSuccess = (state, action) => {
  const updatedMembers = cloneDeep(state.members.staff_members);
  const updatedClinic = cloneDeep(state.members);
  const index = updatedMembers.findIndex((member) => {
    return member.id === action.staffId;
  });
  for (let key in action.updatedStaff) {
    updatedMembers[index][key] = action.updatedStaff[key];
  }
  updatedClinic.staff_members = updatedMembers;
  return updateObject(state, { loading: false, members: updatedClinic });
};
const editStaffFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const deleteStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const deleteStaffSuccess = (state, action) => {
  const updatedMembers = cloneDeep(state.members.staff_members);
  const updatedClinic = cloneDeep(state.members);
  const index = updatedMembers.findIndex((member) => {
    return member.id === action.staffId;
  });
  updatedMembers.splice(index, 1);
  updatedClinic.staff_members = updatedMembers;
  return updateObject(state, { loading: false, members: updatedClinic });
};
const deleteStaffFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MEMBERS_START:
      return fetchMembersStart(state, action);
    case actionTypes.FETCH_MEMBERS_SUCCESS:
      return fetchMembersSuccess(state, action);
    case actionTypes.FETCH_MEMBERS_FAIL:
      return fetchMembersFail(state, action);
    case actionTypes.EDIT_STAFF_START:
      return editStaffStart(state, action);
    case actionTypes.EDIT_STAFF_SUCCESS:
      return editStaffSuccess(state, action);
    case actionTypes.EDIT_STAFF_FAIL:
      return editStaffFail(state, action);
    case actionTypes.DELETE_STAFF_START:
      return deleteStaffStart(state, action);
    case actionTypes.DELETE_STAFF_SUCCESS:
      return deleteStaffSuccess(state, action);
    case actionTypes.DELETE_STAFF_FAIL:
      return deleteStaffFail(state, action);

    case actionTypes.CREATE_STAFF_START:
      return createStaffStart(state, action);
    case actionTypes.CREATE_STAFF_SUCCESS:
      return createStaffSuccess(state, action);
    case actionTypes.CREATE_STAFF_FAIL:
      return createStaffFail(state, action);
    default:
      return state;
  }
};
export default reducer;
