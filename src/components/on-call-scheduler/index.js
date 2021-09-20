import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getOnCallIsFetching } from 'store/selectors/base.selectors';

import OnCallScheduler from './on-call-scheduler';

const mapStateToProps = createStructuredSelector({
  isFetching: getOnCallIsFetching,
});

export default connect(mapStateToProps)(OnCallScheduler);
