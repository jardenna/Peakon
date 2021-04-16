import React, { useReducer } from 'react';

import Context from './context';
import Reducer from './reducer';

import Endpoints from '@common/endpoints';

import {
   FETCH_LOADING,
   FETCH_SUCCESS,
   FETCH_ERROR
} from '../types';


const State = props => {
   const initialState = {
      users: {},
      loading: false,
      error: ''
   };


   const [state, dispatch] = useReducer(Reducer, initialState);
   //Set Loading
   const setLoading = () => dispatch({ type: FETCH_LOADING });
   const setError = () => dispatch({ type: FETCH_ERROR });


   //Initial Users
   const getManagers = async () => {
      const url = Endpoints.main;
      setLoading();
      try {
         const response = await fetch(url);
         const result = await response.json();

         if (response.ok) {
            dispatch({
               type: FETCH_SUCCESS,
               payload: result
            });

         }

      } catch (err) {
         setError(err);
      }
   };


   return (
      <Context.Provider value={{
         users: state.users,
         loading: state.loading,
         error: state.error,
         getManagers

      }}>
         {props.children}
      </Context.Provider>
   );


};

export default State;