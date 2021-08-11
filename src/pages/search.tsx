import React, { useState } from 'react';
import { Genres, SortFilters, AnimeList } from '../application/customTypes';
import { genreListQuery, searchQuery } from '../api/anilist'

import HeaderSearch from '../components/HeaderSearch';
import CardGrid from '../components/CardGrid';
import CardGridLoading from '../components/CardGridLoading';
import PaginationBar from '../components/PaginationBar';

import styles from './search.module.scss';

const Search: React.FC<{}> = () => {

    enum GridType {
        Top,
        Genre,
        Search
    }

    const [ gridType, setGridType ] = useState<GridType>(GridType.Search);
    const [ isGridLoading, setIsGridLoading ] = useState<boolean>(true);

    const [ gridGenres, setGridGenres ] = useState<Array<Genres>>([]);
    const [ activeGenres, setActiveGenres ] = useState<Array<Genres>>([]);

    const [ gridSearch, setGridSearch ] = useState<string>('');
    const [ activeSearch, setAciveSearch ] = useState<string>('');

    const [ animeList, setAnimeList ] = useState<AnimeList | null>(null);

    //query functions to be used by search handlers
    const queryHandlers = {
        genreSearch: (page: number, genres: Genres[], sorts: SortFilters[]) => {
            setIsGridLoading(true);
            //set genres for pagination
            setActiveGenres(genres);
            setGridType(GridType.Genre);

            genreListQuery(page, 20, genres, sorts)
                .then((data) => {
                    console.log(data.data.Page);
                    setAnimeList(data.data.Page);
                    setIsGridLoading(false);
                });
        },
        termSearch: (page: number, search: string) => {
            setIsGridLoading(true);
            //set term used on grid for pagination
            setAciveSearch(search);
            setGridType(GridType.Search);

            searchQuery(page, 20, search)
                .then((data) => {
                    console.log(data.data.Page);
                    setAnimeList(data.data.Page);
                    setIsGridLoading(false);
                });
        }
    };

    //executes query searches from queryHandlers on grid
    const searchHandlers = {
        handleTermSearch: (e: any) => {
            e.preventDefault();

            if (gridSearch.length < 3) {
                return 
            } else {
                queryHandlers.termSearch(1, gridSearch);
            }
        },
        handleSearchGenres: () => {
            if (gridGenres.length) {
                queryHandlers.genreSearch(1, gridGenres, [SortFilters.SCORE_DESC, SortFilters.POPULARITY_DESC])
            }
        },
        handlePaginate: (page: number) => { //should change based on gridType
            if (gridType === GridType.Search) {
                queryHandlers.termSearch(page, activeSearch);
            }
            if (gridType === GridType.Genre) {
                queryHandlers.genreSearch(page, activeGenres, [SortFilters.SCORE_DESC, SortFilters.POPULARITY_DESC]);
            }
        }
    };

    //handles changes to search states
    const changeHandlers = {
        handleChangeSearch: (e: any) => {
            setGridSearch(e.target.value);
        },
        handleChangeGenres: (e: any) => {
            if (gridGenres.includes(e.target.innerText)) {
                setGridGenres(prevState => {
                    return prevState.filter(el => el !== e.target.innerText);
                })
            } else {
                setGridGenres(prevState => {
                    return [...prevState, e.target.innerText]
                })
            }
        }
    };

    return (
        <main>

            <HeaderSearch 
                gridSearch={gridSearch}
                handleChangeSearch={changeHandlers.handleChangeSearch}
                handleTermSearch={searchHandlers.handleTermSearch}
                handleChangeGenres={changeHandlers.handleChangeGenres}
                handleSearchGenres={searchHandlers.handleSearchGenres}
                gridGenres={gridGenres}
            />

            <section className={styles.grid_body}>
                {
                    isGridLoading ? (
                        <CardGridLoading />
                    ) : (
                        <CardGrid 
                            gridType={gridType}
                            gridGenres={gridGenres}
                            animeList={animeList}
                        />
                    )
                }
            </section>

            <PaginationBar 
                pageInfo={animeList?.pageInfo}
                handlePaginate={searchHandlers.handlePaginate}
            />

        </main>
    )
};

export default Search;