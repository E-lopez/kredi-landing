import { initialModel } from "./initialState";

export default function TokenReducer(
  surveyState: any, 
  action: { 
    type: string,
    data?: Record<string, string> 
  }
) {
  console.log("TOKEN REDUCER ACTION:", action);
  switch(action.type) {
    case 'SAVE_TOKEN':
      return {
        ...surveyState,
        ...action.data,
      }
    case 'RESET_TOKEN':
      return initialModel;
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
