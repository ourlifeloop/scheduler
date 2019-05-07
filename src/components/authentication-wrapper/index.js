import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { authenticate } from 'store/actions/user.actions';
import { getIsLoggingIn, getUserError } from 'store/selectors/base.selectors';

import AuthenticationWrapper from './authentication-wrapper';

const mapStateToProps = createStructuredSelector({
  isLoggingIn: getIsLoggingIn,
  error: getUserError,
});

export default connect(
  mapStateToProps,
  { authenticate },
)(AuthenticationWrapper);
