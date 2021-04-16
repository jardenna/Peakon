import React from 'react';
import PropTypes from 'prop-types';

function Icon({ size, children, className, style, variant, shape }) {
   const defaultStyles = { display: 'inline-block', verticalAlign: 'middle', width: size, height: size };
   const styles = { ...defaultStyles, ...style };


   return (
      <span
         style={styles}
         className={`${className} icon icon-${variant} ${shape}`}
      >
         {children}

      </span>
   );
}


Icon.defaultProps = {
   size: 16,
   style: {},
   className: ''
};

Icon.propTypes = {
   size: PropTypes.number.isRequired,
   shape: PropTypes.oneOfType([
      PropTypes.oneOf(['rounded', 'large'])
   ]),
   children: PropTypes.node.isRequired,

   // style: PropTypes.shape(PropTypes.object),
   className: PropTypes.string
};

export default Icon;

