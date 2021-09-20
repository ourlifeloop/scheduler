/* Calendar */
export const getCalendarForm = state => state.calendar.form;
export const getisEventFormModalOpen = state =>
  state.calendar.isEventFormModalOpen;
export const getIsViewerModalOpen = state => state.calendar.isViewerModalOpen;
export const getEvents = state => state.calendar.models;
export const getCalendarMonths = state => state.calendar.months;
export const getSelectedEvent = state => state.calendar.selectedEvent;

/* On Call */
export const getOnCallIsFetching = state => state.onCall.isFetching;
export const getOnCallState = state => state.onCall.state;

/* Router */
export const getPathname = state => state.router.location.pathname;

/* User */
export const getUser = state => state.user.model;
export const getIsLoggedIn = state => !!(state.user.model || {}).uid;
export const getIsInitialized = state => state.user.isInitialized;
export const getLoginForm = state => state.user.loginForm;
export const getIsLoggingIn = state => state.user.isLoggingIn;
export const getUserError = state => state.user.error;
