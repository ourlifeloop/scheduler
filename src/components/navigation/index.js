import { connect } from 'react-redux';

import { signout } from 'store/actions/user.actions';

import Navigation from './navigation';

export default connect(null, { signout })(Navigation);
