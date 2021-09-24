import {
  SIGNUP,
  SIGNIN,
  ADD_ADDRESS,
  ADD_ORDER,
  SIGNOUT,
  EDIT_USER,
  DELETE_USER,
  NAVER_SIGNOUT,
  KAKAO_SIGNOUT,
} from "../_actions/type";

export default function user_reducer(state = {}, action) {
  switch (action.type) {
    case SIGNUP:
      return { ...state, signUp: action.payload };

    case SIGNIN:
      console.log("aciotnsignin", action.payload);
      return { ...state, ...action.payload };

    case SIGNOUT:
      return (state = {});

    case ADD_ADDRESS: {
      console.log({ ...state });
      return { ...state };
    }
    case ADD_ORDER: {
      console.log("addorder", action.payload);
      if (!state.order) {
        return { ...state, order: [ action.payload ] };
      } else {
        return {...state,order: [...state.order, action.payload]}
      }
    }

    case EDIT_USER : 
      console.log('===EDIT_USER===',action.payload);
      return {...state , ...action.payload};
    
    case DELETE_USER : 
      return (state = {});

    case KAKAO_SIGNOUT:
      return (state = {});
    case NAVER_SIGNOUT:
      return (state = {});
    default:
      return state;
  }
}
