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

    const [ isGridLoading, setIsGridLoading ] = useState<boolean>(true);

    const [ gridType, setGridType ] = useState<GridType>();

    const [ gridPage, setGridPage ] = useState<number>(1);

    const [ gridSearch, setGridSearch ] = useState<string>('');
    const [ activeSearch, setAciveSearch ] = useState<string>('');

    const [ gridGenres, setGridGenres ] = useState<Array<Genres>>([]);
    const [ activeGenres, setActiveGenres ] = useState<Array<Genres>>([]);

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

    //restore previous search for current session, if first load default to search by top, page 1
    useEffect(() => {
        //fires on first load of session
        if (!sessionStorage.getItem('type')) {
            queryHandlers.topSearch(1);
            return
        };

        const storedGridType = sessionStorage.getItem('type');
        const storedPage = sessionStorage.getItem('page');

        //fires on all subsequent reloads of component as the first load must define and store a gridType and gridPage
        if (storedGridType && storedPage) {
            if (parseInt(storedGridType) === GridType.Top) {
                //search top rated, restore current page
                queryHandlers.topSearch(parseInt(storedPage));
                return;
            } 
            if (parseInt(storedGridType) === GridType.Search) {
                const storedSearch = sessionStorage.getItem('search');

                if (storedSearch) {
                    //restore last entered search term for UI
                    setGridSearch(storedSearch);
                    //restore previous search with last active term searched and current page
                    queryHandlers.termSearch(parseInt(storedPage), storedSearch);
                }
                return;
            } 
            if (parseInt(storedGridType) === GridType.Genre) {
                const storedGenres = sessionStorage.getItem('genres');

                if (storedGenres) {
                    //restore selected genres for UI
                    setGridGenres(JSON.parse(storedGenres));
                    //restore previous search with active genres and current page
                    queryHandlers.genreSearch(parseInt(storedPage), JSON.parse(storedGenres), [SortFilters.SCORE_DESC, SortFilters.POPULARITY_DESC]);
                }
                return;
            }
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('page', JSON.stringify(gridPage));
    }, [gridPage]);

    useEffect(() => {
        if (gridType !== undefined) {
            sessionStorage.setItem('type', JSON.stringify(gridType));
        }
    }, [gridType]);

    useEffect(() => {
        sessionStorage.setItem('search', activeSearch);
    }, [activeSearch]);

    useEffect(() => {
        sessionStorage.setItem('genres', JSON.stringify(activeGenres));
    }, [activeGenres]);

    //query functions to be used by search handlers
    const queryHandlers = {
        genreSearch: (page: number, genres: Genres[], sorts: SortFilters[]): void => {
            setIsGridLoading(true);
            //set genres for pagination
            setActiveGenres(genres);
            setGridType(GridType.Genre);
            setGridPage(page);

            genreListQuery(page, perPageCount, genres, sorts)
                .then((data) => {
                    setAnimeList(data.data.Page);
                    setIsGridLoading(false);
                });
        },
        termSearch: (page: number, search: string): void => {
            setIsGridLoading(true);
            //set term used on grid for pagination
            setAciveSearch(search);
            setGridType(GridType.Search);
            setGridPage(page);

            searchQuery(page, perPageCount, search)
                .then((data) => {
                    setAnimeList(data.data.Page);
                    setIsGridLoading(false);
                });
        },
        topSearch: (page: number): void => {
            setIsGridLoading(true);
            setGridType(GridType.Top);
            setGridPage(page);

            topQuery(page, perPageCount)
                .then((data) => {
                    setAnimeList(data.data.Page);
                    setIsGridLoading(false);
                });
        }
    };

    //executes query searches from queryHandlers on grid
    const searchHandlers = {
        handleTermSearch: (e: any): void => {
            e.preventDefault();

            if (gridSearch.length < 3) {
                return 
            } else {
                queryHandlers.termSearch(1, gridSearch);
            }
        },
        handleSearchGenres: (): void => {
            if (gridGenres.length) {
                queryHandlers.genreSearch(1, gridGenres, [SortFilters.SCORE_DESC, SortFilters.POPULARITY_DESC])
            }
        },
        handlePaginate: (page: number): void => { //should change based on gridType
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
        handleChangeSearch: (e: any): void => {
            setGridSearch(e.target.value);
        },
        handleChangeGenres: (e: any): void => {
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