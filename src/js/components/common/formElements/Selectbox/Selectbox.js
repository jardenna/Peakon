import React from 'react';

import Options from '@formElements/SelectBox/Options';
import Values from '@formElements/SelectBox/Values';
import Context from '@context/managers/context';
import Loader from '@commonReact/Loader';
import Error from '@commonReact/Error';



import useSelectbox from '@hooks/useSelectbox';
import { CONTENT } from '../../../../common/constants/managerContent';



function SelectBox({ options, label, multiple, placeholder, zIndex, callBack, input, notFound, inputIdentifer }) {

   const [onBlur,
      onKeyDown,
      selectValues,
      onDeleteOption,
      isOpen,
      focusedValue,
      onClickOption,
      onClick,
      onInputChange,
      inputValue,
      filteredOptions,
      emptySearch] = useSelectbox(options, multiple, placeholder, input, callBack);

   const context = React.useContext(Context);
   const { loading, error } = context;

   const hasError = error.length > 0;

   return (
      <div>

         <section
            className="select"
            tabIndex="0"
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            style={{ zIndex }}

         >

            <label className="label" id={inputIdentifer}>{label}</label>
            <div className="selection" onClick={onClick}>
               {
                  input ?
                     <div>
                        <input type="text" onChange={onInputChange} value={inputValue} name={inputIdentifer} aria-label={inputIdentifer} />
                        {selectValues.length !== 0 &&
                           <button className="icon-x" onClick={emptySearch}>
                              <span className="sr-only">   {CONTENT.clearAll}</span>

                           </button>
                        }
                     </div>
                     :
                     <Values
                        placeholder={placeholder}
                        multiple={multiple}
                        values={selectValues}
                        onDeleteOption={onDeleteOption}
                        input={input}
                     />
               }

               <span className={`chevron ${isOpen ? 'chevron-up' : 'chevron-down'}`} />

            </div>
            {loading ? <Loader /> : <Options
               filteredOptions={filteredOptions}
               multiple={multiple}
               values={selectValues}
               isOpen={isOpen}
               focusedValue={focusedValue}
               onClickOption={onClickOption}
               notFound={notFound}
            />}
            {hasError &&
               <Error>{error}</Error>

            }
         </section>
      </div>


   );
}



export default SelectBox;