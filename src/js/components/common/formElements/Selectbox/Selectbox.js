import React from 'react';

import Options from '@formElements/SelectBox/Options';
import Values from '@formElements/SelectBox/Values';
import useSelectbox from '@hooks/useSelectbox';

function SelectBox({ options, label, multiple, placeholder, zIndex, callBack, input, notFound }) {

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

   console.log(selectValues);

   return (
      <div>

         <section
            className="select"
            tabIndex="0"
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            style={{ zIndex }}

         >

            <label className="label">{label}</label>
            <div className="selection" onClick={onClick}>
               {
                  input ?
                     <div>

                        <input type="text" onChange={onInputChange} value={inputValue} />
                        {selectValues.length !== 0 && <button className="icon-x" onClick={emptySearch} />}
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
            <Options
               filteredOptions={filteredOptions}
               multiple={multiple}
               values={selectValues}
               isOpen={isOpen}
               focusedValue={focusedValue}
               onClickOption={onClickOption}
               notFound={notFound}
            />
         </section>
      </div>


   );
}



export default SelectBox;