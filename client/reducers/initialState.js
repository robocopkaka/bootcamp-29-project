export default {
  session: {
    jwt: !!sessionStorage.jwt,
    isAdmin: !!sessionStorage.isAdmin,
    userId: sessionStorage.userId
  },
  isRegistered: !!sessionStorage.registered,
  centers: [],
  events: [],
  center: {},
  event: {},
  componentName: ''
};
