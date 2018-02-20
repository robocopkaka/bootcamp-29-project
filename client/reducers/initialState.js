export default {
  session: !!sessionStorage.jwt,
  isRegistered: !!sessionStorage.registered,
  centers: [],
  events: [],
  center: {}
};
