export default {
  session: {
    jwt: !!sessionStorage.jwt,
    isAdmin: !!sessionStorage.isAdmin
  },
  isRegistered: !!sessionStorage.registered,
  centers: [],
  events: [],
  center: {},
  event: {},
  componentName: ''
};
