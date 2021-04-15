import React from 'react';


import useTimeout from '@hooks/useTimeout';
import { ARROW_DOWN, ARROW_UP, ENTER, ESC, SPACE, END, HOME } from '@common/constants/keyboard';

function useSelectbox(options, multiple, placeholder, input, callBack = () => { }) {

   const [selectValues, setSelectValues] = React.useState([]);
   const [focusedValue, setFocusedValue] = React.useState(-1);
   const [isOpen, setIsOpen] = React.useState(false);
   const [typed, setTyped] = React.useState('');
   const [inputValue, setInputValue] = React.useState('');
   const [inputChanged, setInputChanged] = React.useState(false);




   useTimeout(() => setTyped(''), 1000, typed);

   const onBlur = () => {

      // if (inputValue === '') {
      //    setIsOpen(false);
      // }

      if (multiple) {
         setFocusedValue(-1);

      }
      //else {
      //    const value = selectValues[0];
      //    if (value) {
      //       setFocusedValue(options.findIndex(option => option.value === value));
      //    }

      //    return (
      //       focusedValue
      //    );
      //}
   };



   const onKeyDown = (e) => {


      switch (e.key) {
         case SPACE:


            if (isOpen) {
               if (multiple) {

                  if (focusedValue !== -1) {
                     const value = options[focusedValue] && options[focusedValue].value;

                     setSelectValues(prevState => {
                        const index = prevState.indexOf(value);
                        if (index === -1) {
                           return [...prevState, value];
                        } else {

                           return filterFn(selectValues, value);
                        }

                     });
                  }
               }
            }
            break;
         case END:
            setFocusedValue(options.length - 1);

            if (input) {
               setInputValue([options[options.length - 1].value]);
            }

            if (!multiple) {
               setSelectValues([options[options.length - 1].value]);
            }
            break;

         case HOME:
            setFocusedValue(0);
            if (input) {
               setInputValue([options[0].value]);
            }

            if (!multiple) {
               setSelectValues([options[0].value]);
            }
            break;
         case ESC:
            if (isOpen) {
               setIsOpen(false);
               if (input) {
                  setInputValue([]);
               }

               if (!multiple) {
                  setSelectValues([]);
                  setFocusedValue(-1);
               }
            }
            break;
         case ENTER:
            setIsOpen(!isOpen);
            e.preventDefault();

            if (!multiple) {
               callBack(selectValues[0]);
            } else {
               callBack(selectValues);
            }

            break;
         case ARROW_DOWN:
            if (focusedValue < options.length - 1) {

               setFocusedValue(prevState => {

                  return (
                     prevState + 1
                  );
               });

               if (!multiple) {
                  //Set inputValue if input
                  if (input) {
                     setInputValue([options[focusedValue + 1].value]);
                  }

                  //Set setSelectValues if not input
                  setSelectValues([options[focusedValue + 1].value]);
               }
            }

            break;

         case ARROW_UP:
            if (focusedValue > 0) {
               setFocusedValue(prevState => {
                  return (
                     prevState - 1
                  );
               });
               //Set inputValue if input
               if (input) {
                  setInputValue([options[focusedValue - 1].value]);
               }
               if (!multiple) {
                  setSelectValues([options[focusedValue - 1].value]);
               }
            }
            break;

         default:
            if (/^[a-z0-9]$/i.test(e.key)) {
               const char = e.key;
               const regex = new RegExp(`^${char}`, 'i');
               const index = options.findIndex(option => regex.test(option.value));
               const searchOption = [options[index] ? options[index].value : placeholder];
               if (!input) {
                  setFocusedValue(index);
               }
               if (!multiple) {
                  setSelectValues(searchOption);
               }

               setTyped(char);



            }
            break;
      }


   };

   const onClick = () => {

      setIsOpen(!isOpen);

   };

   const filterFn = (selectValues, value) => {

      return selectValues.filter(item => item !== value);
   };

   //Kun filtrer når der er skrevet noget i input
   const filteredOptions = options && options.filter(a => {
      const valueString = inputValue.toString().toLocaleLowerCase();
      if (inputChanged) {
         return a.value.toLowerCase().includes(valueString);
      }
      return options;
   });



   const onInputChange = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setInputValue(e.target.value);
      setInputChanged(true);

      setIsOpen(true);
   };

   const emptySearch = (e) => {
      e.stopPropagation();
      setInputChanged(false);
      setFocusedValue(-1);
      setInputValue('');
      setIsOpen(false);
   };

   const onDeleteOption = (value) => {

      const searchTerm = selectValues.filter(a => a !== value);

      callBack([...searchTerm]);

      setSelectValues(prevState => {
         const selectValues = [...prevState];

         return filterFn(selectValues, value);

      });


   };



   const onClickOption = (value) => {


      if (input) {
         setInputValue(value);
      }
      if (!multiple) {
         setSelectValues([value]);
         setIsOpen(false);
         callBack(value);
      } else {

         setSelectValues(prevState => {
            const selectValues = [...prevState, value];
            const index = prevState.indexOf(value);

            if (index !== -1) {
               return filterFn(selectValues, value);
            }

            callBack(selectValues);
            return selectValues;
         });
      }

   };




   return [onBlur, onKeyDown, selectValues, onDeleteOption, isOpen, focusedValue, onClickOption, onClick, onInputChange, inputValue, filteredOptions, emptySearch];
}

export default useSelectbox;
