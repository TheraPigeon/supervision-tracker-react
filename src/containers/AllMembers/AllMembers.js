import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class AllMembers extends Component {
  componentDidMount() {
    this.props.fetchMembers(this.props.clinicId, this.props.token);
  }
  componentDidUpdate() {
    this.props.fetchMembers(this.props.clinicId, this.props.token);
  }
  render() {
    return (
      <div>
        ClinicId: <span>{this.props.clinicId}</span>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    members: state.allmembers.members,
    clinicId: state.auth.currentClinic,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: (clinicId, token) =>
      dispatch(actions.fetchMembers(clinicId, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllMembers);
