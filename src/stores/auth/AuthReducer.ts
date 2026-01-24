export default function authReducer(
  state: any, 
  action: {
    type: 'LOGIN' | 'LOGOUT' | 'UPDATE_COMPANY_ID' | 'REGISTER',
    payload: {
      user: { 
        token: string,
        name: string,
        companyId: string,
      }
    }
  }
) {
  const { user } = action.payload
  switch(action.type) {
    case 'LOGIN': 
    case 'REGISTER': {
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'UPDATE_COMPANY_ID': {
      return {
        ...state,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
