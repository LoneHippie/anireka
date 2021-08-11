////////// Shared //////////

type Title = {
    english: string,
    native: string,
    romaji?: string
}

type CoverImage = {
    extraLarge: string,
    large: string,
    medium: string,
    color: string
}

////////// Anime List //////////

export type Pagination = {
    total: number,
    currentPage: number,
    lastPage: number,
    hasNextPage: boolean,
    perPage: number
}

export type MediaMini = {
    id: number,
    title: Title,
    episodes: number,
    averageScore: number,
    popularity: number,
    coverImage: CoverImage
}

export type AnimeList = {
    pageInfo: Pagination,
    media: Array<MediaMini>
}

////////// Single Anime /////////

type Media = {
    id: number,
    title: Title,
    episodes: number,
    duration: number,
    averageScore: number,
    popularity: number,
    startDate: { year: number },
    type: string,
    format: string,
    genres: string[],
    description: string,
    trailer: null | string,
    coverImage: CoverImage,
    relations: any
}

type Studio = {
    name: string
}

export type Anime = {
    Media: Media,
    Studio: Studio
}

////////// Enums //////////

export enum Genres {
    ACTION = 'Action',
    ADVENTURE = 'Adventure',
    COMEDY = 'Comedy',
    DRAMA = 'Drama',
    ECCHI = 'Ecchi',
    FATANSY = 'Fantasy',
    HORROR = 'Horror',
    MAHOU_SHOUJO = 'Mahou Shoujo',
    MECHA = 'Mecha',
    MUSIC = 'Music',
    MYSTERY = 'Mystery',
    PSYCHOLOGICAL = 'Psychological',
    ROMANCE = 'Romance',
    SCIFI = 'Sci-Fi',
    SLICE_OF_LIFE = 'Slice of Life',
    SPORTS = 'Sports',
    SUPERNATURAL = 'Supernatural',
    THRILLER = 'Thriller'
}

export enum SortFilters {
    SCORE = "SCORE",
    SCORE_DESC = "SCORE_DESC",
    POPULARIY = "POPULARITY",
    POPULARITY_DESC = "POPULARITY_DESC"
}