import { push } from 'redux-first-history';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getIsLoggedIn,
  getIsInitialized,
} from 'store/selectors/base.selectors';

import ProtectedRoutes from './protected-routes';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: getIsLoggedIn,
  isInitialized: getIsInitialized,
});

const mapDispatchToProps = dispatch => ({
  toHome: () => dispatch(push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);
