import PropTypes from 'prop-types';

const Logo = ({ 
  src, 
  alt, 
  logoWidth = 'w-64', 
  logoHeight = '', 
  className = '' 
}) => (
  <img
    src={src}
    alt={alt}
    className={`mx-auto ${logoHeight} ${logoWidth} ${className}`}
  />
);

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  logoWidth: PropTypes.string,
  logoHeight: PropTypes.string,
};

export default Logo;