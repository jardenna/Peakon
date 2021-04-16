import {
   FETCH_LOADING,
   FETCH_SUCCESS,
   FETCH_ERROR
} from '@context/types';

export default (state, action) => {

   switch (action.type) {
      case FETCH_LOADING:
         return {
            ...state,
            loading: true
         };

      case FETCH_ERROR:
         return {
            ...state,
            loading: false,
            error: action.payload
         };
      case FETCH_SUCCESS:
         return {
            ...state,
            users: action.payload,
            loading: false
         };




      default: return state;

   }
};

