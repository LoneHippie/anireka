import React, { Suspense, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useSearch from "./useSearch";

import { CardGridLoading, CardGridOffline } from '../../components';

import styles from './search.module.scss';

const Search: React.FC<{}> = () => {

    //lazy load to improve performance
    const CardGrid = React.useMemo(() => React.lazy(() => import('../../components/CardGrid')), []);
    const PaginationBar = React.useMemo(() => React.lazy(() => import('../../components/PaginationBar')), []);
    const HeaderSearch = React.useMemo(() => React.lazy(() => import('../../components/HeaderSearch')), []);

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

    const {
        animeList,
        clientHasConnection,
        isGridLoading,
        searchHandlers,
        changeHandlers,
        adultContent,
        gridSearch,
        gridGenres
    } = useSearch(perPageCount);

    const gridBodyRender = useCallback(() => {
        if (isGridLoading) return <CardGridLoading />

        return clientHasConnection ? (
            <CardGrid animeList={animeList} />
        ) : (
            <CardGridOffline />
        )
    }, [isGridLoading, clientHasConnection, animeList]);

    return (
        <main>

            <Helmet>
                <html lang="en" />
                <meta name="description" content="Search for your favorite animes or discover something new. Browse by popularity, user score, new or by genre tags." />
                <title>Anireka | Anime Search</title>
            </Helmet>

            <Suspense fallback={<div className={styles.header_placeholder}></div>}>
                <HeaderSearch 
                    gridSearch={gridSearch}
                    handlePresetSearch={searchHandlers.handlePresetSearch}
                    handleChangeSearch={changeHandlers.handleChangeSearch}
                    handleTermSearch={searchHandlers.handleTermSearch}
                    handleChangeGenres={changeHandlers.handleChangeGenres}
                    handleSearchGenres={searchHandlers.handleSearchGenres}
                    handleChangeAdultContent={changeHandlers.handleChangeAdultContent}
                    adultContent={adultContent}
                    gridGenres={gridGenres}
                />
            </Suspense>

            <section className={styles.grid_body}>
                <Suspense fallback={<CardGridLoading />}>
                    { gridBodyRender() }
                </Suspense>
            </section>

            <Suspense fallback={<div className={styles.pagination_placeholder}></div>}>
                <PaginationBar 
                    pageInfo={animeList?.pageInfo}
                    handlePaginate={searchHandlers.handlePaginate}
                />
            </Suspense>

        </main>
    )
};

export default Search;