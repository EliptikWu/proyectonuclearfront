import PropTypes from 'prop-types';
import Image from 'next/image';

const Logo = ({ src, alt, width, height, className = '', style = {} }) => (
  <div className={className} style={style}>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};

Logo.defaultProps = {
  width: 256,
  height: 0, 
};
export default Logo;
