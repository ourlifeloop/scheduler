import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getOnCallState } from 'store/selectors/base.selectors';
import { createMember } from 'store/actions/on-call.actions';

import OnCallGroup from './on-call-group';

const mapStateToProps = createStructuredSelector({
  onCallState: getOnCallState,
});

export default connect(mapStateToProps, { createMember })(OnCallGroup);
