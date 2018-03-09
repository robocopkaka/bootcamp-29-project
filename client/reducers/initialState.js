export default {
  session: {
    jwt: !!sessionStorage.jwt,
    isAdmin: !!sessionStorage.isAdmin,
    userId: sessionStorage.userId
  },
  register: {
    isRegistered: !!sessionStorage.registered,
    message: ''
  },
  centers: [],
  events: [],
  center: {},
  event: {},
  componentName: ''
};
