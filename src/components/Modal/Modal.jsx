import PropTypes from "prop-types";
import css from './Modal.module.css';

export const Modal = ({src, alt, handleClose}) => {
    <div className={css.overlay} onClick={handleClose}>
        <div className={css.modal}>
            <img src={src} alt={alt} />
        </div>
    </div>
}

Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default Modal;