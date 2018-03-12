export default {
  session: {
    jwt: !!sessionStorage.jwt,
    isAdmin: !!sessionStorage.isAdmin,
    userId: sessionStorage.userId,
    message: '',
    isLoading: false
  },
  register: {
    isRegistered: !!sessionStorage.registered,
    message: '',
    isLoading: false
  },
  centers: {
    centers: [],
    isLoading: false,
    message: ''
  },
  events: {
    events: [],
    isLoading: false,
    message: ''
  },
  center: {},
  event: {},
  componentName: ''
};
