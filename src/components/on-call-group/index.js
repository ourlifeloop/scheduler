import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createMember, deleteMember } from 'store/actions/on-call.actions';
import { getOnCallState } from 'store/selectors/base.selectors';

import OnCallGroup from './on-call-group';

const mapStateToProps = createStructuredSelector({
  onCallState: getOnCallState,
});

export default connect(mapStateToProps, { createMember, deleteMember })(
  OnCallGroup,
);
