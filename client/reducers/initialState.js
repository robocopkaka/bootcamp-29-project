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
    isLoading: false,
    jwt: !!sessionStorage.jwt,
    isAdmin: !!sessionStorage.isAdmin,
    userId: sessionStorage.userId,
  },
  centers: {
    centers: [],
    isLoading: false,
    message: '',
    meta: {
      pagination: {
        limit: '',
        offset: '',
        page: '',
        pages: '',
        total: ''
      }
    },
    center: {}
  },
  events: {
    events: [],
    isLoading: false,
    message: '',
    meta: {
      pagination: {
        limit: '',
        offset: '',
        page: '',
        pages: '',
        total: ''
      }
    },
    event: {}
  },
  componentName: ''
};
