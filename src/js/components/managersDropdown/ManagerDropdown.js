import React from 'react';

import { CONTENT } from '@common/constants/managerContent';
import Context from '@context/managers/context';

import Selectbox from '@formElements/Selectbox/Selectbox';


const Index = () => {
   const context = React.useContext(Context);

   const { users } = context;


   React.useEffect(() => {
      context.getManagers();
   }, []);

   const managers = users;

   const newManagerArray = managers.data && managers.data.map(manager => {
      //In order to find a conneced Id between managers.data and  manager.included
      //connected Id example: managers.data.id= '12', manager.included.id= '13'
      //The Id both for managers data and  manager included is a string
      //To find the manager email we need to:
      //add 1 to the selected managers.data.id and find connected Id in manager.included
      //Convert manager id to a number and add 1
      const searchId = Number(manager.id) + 1;
      //Convert number back to a string
      const searchIdString = searchId.toString();
      const emailAttributes = managers.included && managers.included.find(include => include.id === searchIdString).attributes;

      const { id } = manager;
      const { name } = manager.attributes;
      const { email } = emailAttributes;
      const managerObj = { id, email, name };

      return (
         managerObj
      );
   });

   const managerOptions = newManagerArray && newManagerArray.map(elm => {
      const b = elm.name === 'New Manager' ? CONTENT.newManager : elm.name;
      const managersInitials = elm.name.match(/\b(\w)/g).join('');


      const icon = managersInitials;
      return (
         { value: b, email: elm.email, icon }
      );
   });



   return (
      <main className="container manager-container">
         <form>

            <Selectbox
               placeholder={CONTENT.chooseManager}
               options={managerOptions}
               notFound={CONTENT.noManagerFound}
               name="managers"
               label={CONTENT.manager}
               inputIdentifer={CONTENT.chooseManager}
               input
            />
         </form>


      </main>


   );
};

export default Index;