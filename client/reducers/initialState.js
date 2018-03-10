export default {
  session: {
    jwt: !!sessionStorage.jwt,
    isAdmin: !!sessionStorage.isAdmin,
    userId: sessionStorage.userId
  },
  register: {
    isRegistered: !!sessionStorage.registered,
    message: '',
    isLoading: false
  },
  centers: [],
  events: [],
  center: {},
  event: {},
  componentName: ''
};
