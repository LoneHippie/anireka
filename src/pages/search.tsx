import React, { useState, useEffect } from 'react';
import { Genres, SortFilters, AnimeList } from '../application/customTypes';
import { genreListQuery, searchQuery, topQuery } from '../api/anilist'
import useWindowDimensions from '../hooks/useWindowDimensions';

import HeaderSearch from '../components/HeaderSearch';
import CardGrid from '../components/CardGrid';
import CardGridLoading from '../components/CardGridLoading';
import CardGridOffline from '../components/CardGridOffline';
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

    const [ adultContent, setAdultContent ] = useState<boolean>(false);

    const [ gridSearch, setGridSearch ] = useState<string>('');
    const [ activeSearch, setAciveSearch ] = useState<string>('');

    const [ gridGenres, setGridGenres ] = useState<Array<Genres>>([]);
    const [ activeGenres, setActiveGenres ] = useState<Array<Genres>>([]);

    const [ clientHasConnection, setClientHasConnection ] = useState<boolean>(true);

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

    //restore previous search for current session, check localStorage for search preferences, if first load default to search by top, page 1
    useEffect(() => {
        let isAdultContent;

        if (localStorage.getItem('adult')) {
            isAdultContent = localStorage.getItem('adult');

            if (isAdultContent) {
                if (JSON.parse(isAdultContent)) setAdultContent(JSON.parse(isAdultContent));
            }
        };

        //fires on first load of session
        if (!sessionStorage.getItem('type')) {
            if (isAdultContent) {
                queryHandlers.topSearch(1, JSON.parse(isAdultContent));
            } else {
                queryHandlers.topSearch(1, adultContent);
            }
            return;
        };

        const storedGridType = sessionStorage.getItem('type');
        const storedPage = sessionStorage.getItem('page');

        //fires on all subsequent reloads of component as the first load must define and store a gridType and gridPage
        if (storedGridType && storedPage) {
            if (parseInt(storedGridType) === GridType.Top) {
                //search top rated, restore current page
                if (isAdultContent) {
                    queryHandlers.topSearch(parseInt(storedPage), JSON.parse(isAdultContent));
                } else {
                    queryHandlers.topSearch(parseInt(storedPage), adultContent);
                }
                return;
            } 
            if (parseInt(storedGridType) === GridType.Search) {
                const storedSearch = sessionStorage.getItem('search');

                if (storedSearch) {
                    //restore last entered search term for UI
                    setGridSearch(storedSearch);
                    //restore previous search with last active term searched and current page
                    if (isAdultContent) {
                        queryHandlers.termSearch(parseInt(storedPage), storedSearch, JSON.parse(isAdultContent));
                    } else {
                        queryHandlers.termSearch(parseInt(storedPage), storedSearch, adultContent);
                    }
                }
                return;
            } 
            if (parseInt(storedGridType) === GridType.Genre) {
                const storedGenres = sessionStorage.getItem('genres');

                if (storedGenres) {
                    //restore selected genres for UI
                    setGridGenres(JSON.parse(storedGenres));
                    //restore previous search with active genres and current page
                    if (isAdultContent) {
                        queryHandlers.genreSearch(
                            parseInt(storedPage), 
                            JSON.parse(storedGenres), 
                            [SortFilters.SCORE_DESC, SortFilters.POPULARITY_DESC],
                            JSON.parse(isAdultContent)
                        );
                    } else {
                        queryHandlers.genreSearch(
                            parseInt(storedPage), 
                            JSON.parse(storedGenres), 
                            [SortFilters.SCORE_DESC, SortFilters.POPULARITY_DESC],
                            adultContent
                        );
                    }
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

    const responseHandlers = {
        setData: (data: any): void => {
            setAnimeList(data.data.Page);
            setIsGridLoading(false);
        },
        setOffline: (): void => {
            setIsGridLoading(false);
            setClientHasConnection(false)
        }
    }

    //query functions to be used by search handlers
    const queryHandlers = {
        genreSearch: (page: number, genres: Genres[], sorts: SortFilters[], adultContent: boolean): void => {
            setClientHasConnection(true);
            setIsGridLoading(true);
            //set genres for pagination
            setActiveGenres(genres);
            setGridType(GridType.Genre);
            setGridPage(page);

            genreListQuery(page, perPageCount, genres, sorts, adultContent)
                .then(responseHandlers.setData)
                .catch(responseHandlers.setOffline);
        },
        termSearch: (page: number, search: string, adultContent: boolean): void => {
            setClientHasConnection(true);
            setIsGridLoading(true);
            //set term used on grid for pagination
            setAciveSearch(search);
            setGridType(GridType.Search);
            setGridPage(page);

            searchQuery(page, perPageCount, search, adultContent)
                .then(responseHandlers.setData)
                .catch(responseHandlers.setOffline);
        },
        topSearch: (page: number, adultContent: boolean): void => {
            setClientHasConnection(true);
            setIsGridLoading(true);
            setGridType(GridType.Top);
            setGridPage(page);

            topQuery(page, perPageCount, adultContent)
                .then(responseHandlers.setData)
                .catch(responseHandlers.setOffline);
        }
    };

    //executes query searches from queryHandlers on grid
    const searchHandlers = {
        handleTermSearch: (e: any): void => {
            e.preventDefault();

            if (gridSearch.length < 3) {
                return 
            } else {
                setGridGenres([]); //empty grid search
                queryHandlers.termSearch(1, gridSearch, adultContent);
            }
        },
        handleSearchGenres: (): void => {
            if (gridGenres.length) {
                setGridSearch(''); //empty searchbar
                queryHandlers.genreSearch(1, gridGenres, [SortFilters.SCORE_DESC, SortFilters.POPULARITY_DESC], adultContent)
            }
        },
        handlePaginate: (page: number): void => { //should change based on gridType
            if (gridType === GridType.Search) {
                queryHandlers.termSearch(page, activeSearch, adultContent);
            }
            if (gridType === GridType.Genre) {
                queryHandlers.genreSearch(page, activeGenres, [SortFilters.SCORE_DESC, SortFilters.POPULARITY_DESC], adultContent);
            }
            if (gridType === GridType.Top) {
                queryHandlers.topSearch(page, adultContent);
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
        },
        handleChangeAdultContent: (e: any): void => {
            setAdultContent(e.target.checked);
            localStorage.setItem('adult', JSON.stringify(e.target.checked));
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
                handleChangeAdultContent={changeHandlers.handleChangeAdultContent}
                adultContent={adultContent}
                gridGenres={gridGenres}
            />

            <section className={styles.grid_body}>
                {
                    isGridLoading ? (
                        <CardGridLoading />
                    ) : (
                        clientHasConnection ? (
                            <CardGrid 
                                animeList={animeList}
                            />
                        ) : <CardGridOffline />
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