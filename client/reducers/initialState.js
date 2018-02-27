export default {
  session: !!sessionStorage.jwt,
  isAdmin: !!sessionStorage.isAdmin,
  isRegistered: !!sessionStorage.registered,
  centers: [],
  events: [],
  center: {},
  event: {}
};
