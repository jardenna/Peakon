import React, { useReducer } from 'react';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import Endpoints from '@common/endpoints';

import {
   SET_LOADING,
   GET_USERS,
   SET_ERROR
} from '../types';


const GithubState = props => {
   const initialState = {
      users: {},
      loading: false,
      error: ''
   };


   const [state, dispatch] = useReducer(GithubReducer, initialState);
   //Set Loading
   const setLoading = () => dispatch({ type: SET_LOADING });
   const setError = () => dispatch({ type: SET_ERROR });

   //Initial Users
   const getUsers = async () => {
      const url = Endpoints.main;
      setLoading();
      try {
         const response = await fetch(url);
         const result = await response.json();

         if (response.ok) {
            dispatch({
               type: GET_USERS,
               payload: result
            });

         }

      } catch (err) {
         setError(err);
      }
   };


   return (
      <GithubContext.Provider value={{
         users: state.users,
         loading: state.loading,
         error: state.error,
         getUsers

      }}>
         {props.children}
      </GithubContext.Provider>
   );


};

export default GithubState;