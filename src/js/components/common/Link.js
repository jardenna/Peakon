import PropTypes from 'prop-types';

function Link({ children, link, mailto, size, variant, className }) {

   return (
      <a className={`${size}, ancher ancher-${variant} ${className}`} href={`${mailto}:${link}`}>{children}</a>
   );
}

Link.defaultProps = {
   size: 'medium',
   className: ''
};

Link.propTypes = {
   children: PropTypes.node.isRequired,
   mailto: PropTypes.string.isRequired,

   size: PropTypes.string.isRequired,
   variant: PropTypes.string,
   className: PropTypes.string


};


export default Link;
