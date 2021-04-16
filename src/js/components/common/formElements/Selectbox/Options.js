import React from 'react';

import Icon from '@components/Icon';
import { CONTENT } from '@common/constants/managerContent';

function Options({ multiple, isOpen, values, focusedValue, onClickOption, filteredOptions }) {

   if (!isOpen) {
      return null;
   }
   return (
      <ul className="options" role='listbox'>

         {filteredOptions.length === 0 ? CONTENT.noManagerFound : filteredOptions.map(
            (option, index) => {
               const { value, valueOne } = option;
               const selected = values.includes(value);
               let className = 'option';
               if (selected) className += ' selected';
               if (index === focusedValue) className += ' focused';
               return (
                  <li
                     key={index}
                     role='option'
                     className={className}
                     onClick={() => onClickOption(value)}
                     aria-selected={selected ? true : null}
                     data-selector="selectOptions"
                  >
                     {multiple &&
                        <span className={`checkbox ${selected ? 'icon-checkmark' : null}`} />
                     }

                     <Icon size={32} variant="primary" shape='rounded'>{value}</Icon>
                     {value} {valueOne}



                  </li>

               );
            }
         )}
      </ul>
   );
}

export default Options;
