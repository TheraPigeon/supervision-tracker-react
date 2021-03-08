import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { cloneDeep } from 'lodash';
const initialState = {
  members: [],
  loading: false,
};

//ADD SOUP
const addSoupStart = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    error: null,
  });
};
const addSoupSuccess = (state, action) => {
  const memberId = parseInt(action.memberId);
  const soup = action.soupData;
  const soupId = action.soupId;
  const thisMemberIndex = state.members.staff_members.findIndex(
    (member) => parseInt(member.id) === memberId
  );
  const updatedMembers = cloneDeep(state.members);
  if (soupId) {
    //editing soup
    const soupIndex = updatedMembers.staff_members[
      thisMemberIndex
    ].supervisions.findIndex((soup) => soup.id === soupId);
    updatedMembers.staff_members[thisMemberIndex].supervisions.splice(
      soupIndex,
      1,
      soup
    );
  } else {
    updatedMembers.staff_members[thisMemberIndex].supervisions.push(soup);
  }
  return updateObject(state, { members: updatedMembers });
};
const addSoupFail = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    error: action.error,
  });
};
const createStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const createStaffSuccess = (state, action) => {
  const updatedMembers = cloneDeep(state.members);
  updatedMembers.staff_members.push(action.newStaff);
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

// REDUCER to delete inProgress soups REVIEW

// const deleteInProgressSoupStart = (state, action) => {
//   return updateObject(state, { loading: true });
// };
// const deleteInProgressSoupSuccess = (state, action) => {
//   console.log('FIND USER AND DELETE SOUP');
//   return updateObject(state, { loading: false });
// };
// const deleteInProgressSoupFail = (state, action) => {
//   return updateObject(state, { loading: false, error: action.error });
// };

const deleteSoupSuccess = (state, action) => {
  //delete soup from member's soup array
  const updatedMembers = cloneDeep(state.members);
  const memberId = action.memberId;
  const soupId = action.soupId;
  const thisMemberIndex = updatedMembers.staff_members.findIndex(
    (member) => member.id === memberId
  );
  const soupIndex = updatedMembers.staff_members[
    thisMemberIndex
  ].supervisions.findIndex((soup) => soup.id === soupId);
  updatedMembers.staff_members[thisMemberIndex].supervisions.splice(
    soupIndex,
    1
  );
  return updateObject(state, {
    members: updatedMembers,
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
    // Adds new member
    case actionTypes.CREATE_STAFF_START:
      return createStaffStart(state, action);
    case actionTypes.CREATE_STAFF_SUCCESS:
      return createStaffSuccess(state, action);
    case actionTypes.CREATE_STAFF_FAIL:
      return createStaffFail(state, action);

    // Adds new soup to member's supervision array
    case actionTypes.ADD_SOUP_START:
      return addSoupStart(state, action);
    case actionTypes.ADD_SOUP_SUCCESS:
      return addSoupSuccess(state, action);
    case actionTypes.ADD_SOUP_FAIL:
      return addSoupFail(state, action);

    // Delete InProgress soup REVIEW
    // case actionTypes.DELETE_IN_PROGRESS_SOUP_START:
    //   return deleteInProgressSoupStart(state, action);
    // case actionTypes.DELETE_IN_PROGRESS_SOUP_SUCCESS:
    //   return deleteInProgressSoupSuccess(state, action);
    // case actionTypes.DELETE_IN_PROGRESS_SOUP_FAIL:
    //   return deleteInProgressSoupFail(state, action);

    case actionTypes.DELETE_SOUP_SUCCESS:
      return deleteSoupSuccess(state, action);

    default:
      return state;
  }
};
export default reducer;
