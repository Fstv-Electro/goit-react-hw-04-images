import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
    <header className={css.searchbar}>
        <form className={css.form} onSubmit={onSubmit}>
            <button type="submit" className={css.button}>
                <span className={css.label}>Search</span>
            </button>

            <input
                name="inputForSearch"
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};

export default Searchbar;