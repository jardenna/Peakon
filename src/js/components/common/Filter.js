import React from 'react';
import PropTypes from 'prop-types';


function Filter({ onClick, onChange, value, placeholder, name, classNameHidden }) {

   return (
      <form className="search">

         <div className="input-wrapper">

            <div className={classNameHidden}>
               <input type="text"
                  placeholder={placeholder}
                  onChange={onChange}
                  value={value}
                  name={name}

               />

               <span onClick={() => onClick(name)}
                  className="icon-x"
               />
            </div>

         </div>
      </form>
   );
}

export default Filter;


Filter.propTypes = {


   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   onChange: PropTypes.func.isRequired,
   onClick: PropTypes.func.isRequired,
   name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired

};
Filter.defaultProps = {
   placeholder: ''

};