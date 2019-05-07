import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { updateLoginForm } from 'store/actions/user.actions';
import { getLoginForm } from 'store/selectors/base.selectors';

import Forgot from './forgot';

const mapStateToProps = createStructuredSelector({
  loginForm: getLoginForm,
});

export default connect(
  mapStateToProps,
  { updateLoginForm },
)(Forgot);
