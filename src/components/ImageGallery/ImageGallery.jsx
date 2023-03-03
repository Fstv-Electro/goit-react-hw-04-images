import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImgClick }) => {
    <ul className={css.gallery}>
        {images.map((image, index) => (
            <ImageGalleryItem
                key={index}
                image={image}
                onClick={onImgClick}
            />
        ))}
    </ul>
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ),
    onImgClick: PropTypes.func.isRequired,
};

export default ImageGallery;