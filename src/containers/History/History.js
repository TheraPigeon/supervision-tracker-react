import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class History extends Component {
  componentDidMount() {
    this.props.fetchSupervisions(this.props.match.params.id, this.props.token);
  }
  render() {
    console.log(this.props.match.params.id);
    return <div>History</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    clinicId: state.auth.currentClinic,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSupervisions: (staffId, token) =>
      dispatch(actions.fetchSupervisions(staffId, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
