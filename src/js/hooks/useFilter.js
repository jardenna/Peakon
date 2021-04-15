import React from 'react';

import { flattenObject } from '@common/utils/flattenObject';

export const useFilter = (initialValues, searchObj) => {
   const [values, setValues] = React.useState(searchObj);


   const filtredText = initialValues.filter(item => {
      const itemFlat = flattenObject(item);
      function replace(myObj) {

         myObj && Object.keys(myObj).forEach(function (key) {
            typeof myObj[key] === 'object' ? replace(myObj[key]) : myObj[key] = String(myObj[key]);
         });
      }
      replace(itemFlat);

      for (let key in values) {

         if (itemFlat[key]) {

            const searchValue = itemFlat[key];

            const searchTerm = values[key].toString().toLowerCase();
            const searched = searchValue.toString().toLowerCase();
            const a = !searched.includes(searchTerm) && values[key] !== '';

            if (a) {
               return false;
            }
         }
      }
      return true;
   });


   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      setValues({
         ...values,
         [name]: value
      });

      if (type === 'checkbox') {
         setValues({
            ...values,
            [name]: checked.toString()
         });
      }


   };


   const handleEmptyInput = (name, e) => {
      e.preventDefault();
      setValues({
         ...values,
         [name]: ''
      });

   };

   const clearAllInputs = (e) => {
      e.preventDefault();
      setValues(searchObj);

   };

   return [values, handleChange, filtredText, handleEmptyInput, clearAllInputs];
};

export default useFilter;