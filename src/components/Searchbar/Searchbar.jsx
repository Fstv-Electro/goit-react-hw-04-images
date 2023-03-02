import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = (getInputValue) => {
    const [input, setInput] = useState('');

    const search = e => {
        e.preventDefault();
        getInputValue(input);
        setInput('');
    };

    const handleChange = e => {
        setInput(e.target.value);
    };
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={search}>
                    <button type="submit" className={css.button}>
                        <span className={css.label}>Search</span>
                    </button>

                    <input
                        name="input"
                        className={css.input}
                        type="text"
                        onChange={handleChange}
                        value={input}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
}

export default Searchbar;