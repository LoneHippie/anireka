import React, { useState, useEffect } from 'react';
import { Genres, SortFilters, AnimeList } from '../application/customTypes';
import { genreListQuery, searchQuery, topQuery } from '../api/anilist'
import useWindowDimensions from '../hooks/useWindowDimensions';

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
    };

    const [ gridType, setGridType ] = useState<GridType>(GridType.Top);
    const [ isGridLoading, setIsGridLoading ] = useState<boolean>(true);

    const [ gridGenres, setGridGenres ] = useState<Array<Genres>>([]);
    const [ activeGenres, setActiveGenres ] = useState<Array<Genres>>([]);

    const [ gridSearch, setGridSearch ] = useState<string>('');
    const [ activeSearch, setAciveSearch ] = useState<string>('');

    const [ animeList, setAnimeList ] = useState<AnimeList | null>(null);

    const { screenWidth } = useWindowDimensions();

    let perPageCount: number = 20;

    if (screenWidth) {
        switch(true) {
            case screenWidth < 400:
                perPageCount = 20;
                break;
            case screenWidth >= 568 && screenWidth < 768:
                perPageCount = 30;
                break;
            case screenWidth >= 768 && screenWidth < 1024:
                perPageCount = 40;
                break;
            default:
                perPageCount = 50;
        }
    };

    useEffect(() => {
        queryHandlers.topSearch(1);
    }, []);

    //query functions to be used by search handlers
    const queryHandlers = {
        genreSearch: (page: number, genres: Genres[], sorts: SortFilters[]) => {
            setIsGridLoading(true);
            //set genres for pagination
            setActiveGenres(genres);
            setGridType(GridType.Genre);

            genreListQuery(page, perPageCount, genres, sorts)
                .then((data) => {
                    setAnimeList(data.data.Page);
                    setIsGridLoading(false);
                });
        },
        termSearch: (page: number, search: string) => {
            setIsGridLoading(true);
            //set term used on grid for pagination
            setAciveSearch(search);
            setGridType(GridType.Search);

            searchQuery(page, perPageCount, search)
                .then((data) => {
                    setAnimeList(data.data.Page);
                    setIsGridLoading(false);
                });
        },
        topSearch: (page: number) => {
            setIsGridLoading(true);
            setGridType(GridType.Top);

            topQuery(page, perPageCount)
                .then((data) => {
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
            if (gridType === GridType.Top) {
                queryHandlers.topSearch(page);
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