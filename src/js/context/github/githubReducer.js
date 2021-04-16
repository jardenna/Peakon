import {
   SET_LOADING,
   GET_USERS,
   SET_ERROR
} from '@context/types';

export default (state, action) => {

   switch (action.type) {
      case SET_LOADING:
         return {
            ...state,
            loading: true
         };

      case SET_ERROR:
         return {
            ...state,
            loading: false,
            error: action.payload
         };
      case GET_USERS:
         return {
            ...state,
            users: action.payload,
            loading: false
         };




      default: return state;

   }
};

