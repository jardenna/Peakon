import React from 'react';

import { CONTENT } from '@common/constants/managerContent';


import Selectbox from '@formElements/Selectbox/Selectbox';

import useGlobalFetch from '@hooks/useGlobalFetch';


const URL = 'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';
const Index = () => {


   const { isLoading, hasError, result } = useGlobalFetch(URL, 'get');


   const managers = result ? result : [];

   const newManagerArray = managers.data && managers.data.map(manager => {

      const searchId = Number(manager.id) + 1;
      const searchIdString = searchId.toString();
      const emailAttributes = managers.included && managers.included.find(include => include.id === searchIdString).attributes;

      const { id } = manager;
      let { firstName, lastName, name } = manager.attributes;
      const { email } = emailAttributes;
      const managerObj = { id, firstName, lastName, email, name };

      return (
         managerObj
      );
   });

   const man = newManagerArray && newManagerArray.map(elm => {
      let b = elm.name === 'New Manager' ? CONTENT.newManager : elm.name;
      return (
         { value: b, valueOne: elm.email }
      );
   });



   return (
      <main className="container manager-container">
         <form >

            <Selectbox
               placeholder={CONTENT.chooseManager}
               options={man}
               name="managers"
               label={CONTENT.manager}
               input
            />
         </form>


      </main>


   );
};

export default Index;