export default {
  session: {
    jwt: !!sessionStorage.jwt,
    isAdmin: !!sessionStorage.isAdmin,
    userId: sessionStorage.userId,
    message: '',
    isLoading: false
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
