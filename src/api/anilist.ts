import { Genres, SortFilters } from "../application/customTypes";

export function recommendationsQuery (animeId: number, page: number) {
    const recommendationsListQuery = `
    query ($id: Int, $page: Int) {
        Media(id: $id, type: ANIME) {
            title {
                english,
                native,
                romaji
            },
            recommendations(sort: [RATING_DESC], perPage: 3, page: $page) {
                pageInfo {
                    total,
                    currentPage,
                    lastPage,
                    hasNextPage,
                    perPage
                },
                edges {
                    node {
                        mediaRecommendation {
                            id,
                            title {
                                english,
                                native,
                                romaji
                            },
                            episodes,
                            averageScore,
                            popularity,
                            coverImage {
                                extraLarge,
                                large,
                                medium,
                                color
                            }
                        }
                    }
                }
            }
        }
    }`;

    const variables = {
        id: animeId,
        page: page
    };

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: recommendationsListQuery,
            variables: variables
        })
    };

    return aniListQuery(url, options);
};

//set with data.data
export function singleQuery (animeId: number) {
    const singleAnimeQuery = `
    query ($id: Int) {
        Media (id: $id, type: ANIME) {
            id
            title {
                english,
                native,
                romaji
            }
            episodes,
            duration,
            averageScore,
            popularity,
            startDate {
                year
            },
            type,
            format,
            genres,
            description(asHtml: false),
            trailer {
                id,
                site,
                thumbnail
            },
            coverImage {
                extraLarge
                large
                medium
                color
            },
            relations {
                edges {
                    relationType,
                    node {
                        id
                    }
                }
            },
            studios {
                edges {
                    isMain,
                    node {
                        name
                    }
                }
            }
        }
    }`;

    const variables = {
        id: animeId
    };

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: singleAnimeQuery,
            variables: variables
        })
    };

    return aniListQuery(url, options);
};

//set with data.data.Page
export function genreListQuery (page: number, perPage: number, genres: Genres[], sort: SortFilters[], isAdult: boolean) {
    const listQuery = `query${isAdult ? `($page: Int, $perPage: Int, $genres: [String], $sort: [MediaSort])` : `($page: Int, $perPage: Int, $genres: [String], $sort: [MediaSort], $isAdult: Boolean)`} {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total,
                currentPage,
                lastPage,
                hasNextPage,
                perPage
            }
            media${isAdult ? `(type: ANIME, genre_in: $genres, sort: $sort)` : `(type: ANIME, genre_in: $genres, sort: $sort, isAdult: $isAdult)`} {
                id,
                title {
                    english,
                    native,
                    romaji
                },
                episodes,
                averageScore,
                popularity,
                coverImage {
                    extraLarge,
                    large,
                    medium,
                    color
                }
            }
        }
    }`;

    const variables = {
        page: page,
        perPage: perPage,
        genres: genres,
        sort: sort,
        isAdult: isAdult
    };

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: listQuery,
            variables: variables
        })
    };

    return aniListQuery(url, options);
};

export function searchQuery (page: number, perPage: number, search: string, isAdult: boolean) {
    const searchQuery = `query${isAdult ? `($page: Int, $perPage: Int, $search: String)` : `($page: Int, $perPage: Int, $search: String, $isAdult: Boolean)`} {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total,
                currentPage,
                lastPage,
                hasNextPage,
                perPage
            }
            media${isAdult ? `(type: ANIME, search: $search, sort: [SCORE_DESC, SEARCH_MATCH])` : `(type: ANIME, search: $search, sort: [SCORE_DESC, SEARCH_MATCH], isAdult: $isAdult)`} {
                id,
                title {
                    english,
                    native,
                    romaji
                },
                episodes,
                averageScore,
                popularity,
                coverImage {
                    extraLarge,
                    large,
                    medium,
                    color
                }
            }
        }
    }`;

    const variables = {
        page: page,
        perPage: perPage,
        search: search,
        isAdult: isAdult
    };

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: searchQuery,
            variables: variables
        })
    };

    return aniListQuery(url, options);
};

export function topQuery (page: number, perPage: number, isAdult: boolean) {
    const topListQuery = `query${isAdult ? `($page: Int, $perPage: Int)` :`($page: Int, $perPage: Int, $isAdult: Boolean)`} {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total,
                currentPage,
                lastPage,
                hasNextPage,
                perPage
            }
            media${isAdult ? `(type: ANIME, sort: [SCORE_DESC, POPULARITY_DESC])` : `(type: ANIME, sort: [SCORE_DESC, POPULARITY_DESC], isAdult: $isAdult)`} {
                id,
                title {
                    english,
                    native,
                    romaji
                },
                episodes,
                averageScore,
                popularity,
                coverImage {
                    extraLarge,
                    large,
                    medium,
                    color
                }
            }
        }
    }`;

    const variables = {
        page: page,
        perPage: perPage,
        isAdult: isAdult
    };

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: topListQuery,
            variables: variables
        })
    };

    return aniListQuery(url, options);
};

async function aniListQuery(url: string, options: object) {
    
    const anime = fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    return anime;
};

function handleResponse(res: any) {
    return res.json().then((resJSON: any) => {
        return res.ok ? resJSON : Promise.reject(resJSON)
    });
};

function handleData(data: any) {
    return data;
};

function handleError(err: any) {
    console.log(err);
};