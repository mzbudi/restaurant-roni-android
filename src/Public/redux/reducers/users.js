const initialState = {
  profile_picture: '',
  name: ''
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_PENDING':
      return {
        ...state
      };
    case 'CHANGE_PASSWORD_REJECTED':
      return {
        ...state
      };
    case 'CHANGE_PASSWORD_FULFILLED':
      return {
        ...state
      };
    case 'CHANGE_PROFILE_PENDING':
      return {
        ...state
      };
    case 'CHANGE_PROFILE_REJECTED':
      return {
        ...state
      };
    case 'CHANGE_PROFILE_FULFILLED':
      return {
        ...state
      };
    case 'GET_PROFILE_PENDING':
      return {
        ...state
      };
    case 'GET_PROFILE_REJECTED':
      return {
        ...state
      };
    case 'GET_PROFILE_FULFILLED':
      return {
        profile_picture: action.payload.data.data.profile_picture,
        name: action.payload.data.data.name
      };
    default:
      return state;
  }
};

export default users;
