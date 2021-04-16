import React from 'react';

import Icon from '@commonReact/Icon';
import Link from '@commonReact/Link';
import NotFound from '@commonReact/NotFound';


function Options({ multiple, isOpen, values, focusedValue, onClickOption, filteredOptions, notFound }) {

   if (!isOpen) {
      return null;
   }
   return (
      <ul className="options" role='listbox'>

         {filteredOptions.length === 0 ? <NotFound> {notFound}</NotFound> : filteredOptions.map(
            (option, index) => {
               const { value, email, icon } = option;
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

                     <div className="option-container">
                        {icon && <Icon size={50} variant="primary" shape='rounded'>{icon}</Icon>}
                        <div className="option-content">
                           {value}
                           {email && <Link
                              mailto={'mailto'}
                              link={email}
                              variant={'primary'}
                           >{email}
                           </Link>}

                        </div>
                     </div>







                  </li>

               );
            }
         )}
      </ul>
   );
}

export default Options;
