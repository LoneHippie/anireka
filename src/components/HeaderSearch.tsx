import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Genres } from '../application/customTypes';

import Logo from '../images/anireka.svg';
import Search from '../images/search.svg';
import Options from '../images/options.svg';

import styles from './HeaderSearch.module.scss';

interface Props {
    gridSearch: string;
    handleChangeSearch: (e: any) => any;
    handleTermSearch: (e: any, page: number) => any;
    handleChangeGenres: (e: any) => any;
    handleSearchGenres: () => any;
    gridGenres: Array<Genres>;
};

const HeaderSearch: React.FC<Props> = ({ gridSearch, handleChangeSearch, handleTermSearch, handleChangeGenres, handleSearchGenres, gridGenres }) => {

    const [ optionsActive, setOptionsActive ] = useState<boolean>(false);

    const genreButtons = () => {
        return Object.values(Genres).map((el, index) => (
            <button
                key={`button-genre-${index}`}
                onClick={(e) => handleChangeGenres(e)}
                style={{
                    color: gridGenres.includes(el) ? '#FFFFFF' : '#00BDD7',
                    background: gridGenres.includes(el) ? '#00BDD7' : '#FFFFFF'
                }}
            >
                {el}
            </button>
        ))
    };

    return (
        <header className={styles.header}>
            
            <div className={styles.search_layout}>

                <Link to="/" className={styles.home}>
                    <img 
                        className={styles.home_button}
                        src={Logo}
                        alt="home"
                        aria-label="button back to home page"
                    />
                </Link>

                <form 
                    className={styles.searchbar}
                    onSubmit={(e) => handleTermSearch(e, 1)}
                >
                    <input 
                        type="text"
                        spellCheck={false}
                        autoCorrect="false"
                        placeholder="Search"
                        aria-label="text search for anime titles"
                        value={gridSearch}
                        onChange={(e) => handleChangeSearch(e)}
                        onFocus={() => setOptionsActive(false)}
                        disabled={optionsActive}
                    />
                    <button
                        aria-label="search button"
                        type="submit"
                        disabled={optionsActive}
                    >
                        <img 
                            src={Search}
                            alt="submit search"
                        />
                    </button>
                </form>

                <button
                    className={styles.options_button}
                    onClick={() => setOptionsActive(!optionsActive)}
                >
                    <img 
                        src={Options}
                        alt="search options"
                        aria-label="open advanced search options"
                    />
                </button>
            </div>

            {
                optionsActive ? (
                    <div 
                        className={styles.ui_blur}
                        onClick={() => setOptionsActive(false)}
                    ></div>
                ) : null
            }

            {
                optionsActive ? (
                    <div className={styles.options}>

                        <h2>Select Genres</h2>
                        
                        <div className={styles.genre_grid}>
                            { genreButtons() }
                        </div>

                        <button
                            className={styles.genre_search_button}
                            onClick={() => {
                                handleSearchGenres();
                                setOptionsActive(false);
                            }}
                            disabled={!gridGenres.length}
                        >
                            Search &rarr;
                        </button>

                    </div>
                ) : null
            }

        </header>
    )
};

export default HeaderSearch;