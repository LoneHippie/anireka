import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'react-html-parser';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { singleQuery } from '../api/anilist';
import { Anime } from '../application/customTypes';

import Navbar from '../components/Navbar';
import PageLoading from '../components/PageLoading';

import SwoopClip from '../images/swoop_clip.svg';
import Logo from '../images/anireka.svg';

import styles from './entry.module.scss';

interface Props {
    match: {
        isExact: boolean,
        params: {
            id: string
        },
        path: string,
        url: string
    }
}

const Entry: React.FC<Props> = ({ match }) => {

    const [ anime, setAnime ] = useState<null | Anime>(null);

    const { screenWidth } = useWindowDimensions();

    useEffect(() => {
        const animeID = parseInt(match.params.id);
        singleQuery(animeID)
            .then((data) => {
                // console.log(data.data.Media);
                setAnime(data.data.Media);
            })
        window.scrollTo(0, 0);
    }, [match.params.id]);

    const animeStudio = (): string => {
        if (!anime) return 'Unknown';
        if (!anime.studios.edges.length) return 'Unknown';

        const hasMainStudio = anime.studios.edges.some(el => el.isMain);

        if (!hasMainStudio) return anime.studios.edges[0].node.name;

        const mainStudio = anime.studios.edges.filter(el => el.isMain);

        return mainStudio[0].node.name;
    };

    const animeFormat = (): string => {
        if (!anime) return 'Unknown';

        switch(true) {
            case anime.format === 'MOVIE':
                return 'Movie';
            case anime.format === 'TV_SHORT':
                return 'TV Short';
            case anime.format === 'SPECIAL':
                return 'Special';
            case anime.format === 'MUSIC':
                return 'Music Video';
            default:
                return anime.format;
        }
    };

    const prequelLink = (): JSX.Element => {
        const buttonDisabled = <button disabled={true}>&larr; Prequel</button>;

        if (!anime) return buttonDisabled;

        const prequelExists = anime.relations.edges.some((el: any) => el.relationType === 'PREQUEL');

        if (!prequelExists) return buttonDisabled;

        const prequel = anime.relations.edges.filter((el: any) => el.relationType === 'PREQUEL');

        return (
            <button>
                <Link to={`/search/${prequel[0].node.id}`}>&larr; Prequel</Link>
            </button>
        )
    };

    const sequelLink = (): JSX.Element => {
        const buttonDisabled = <button disabled={true}>Sequel &rarr;</button>;

        if (!anime) return buttonDisabled;

        const sequelExists = anime.relations.edges.some((el: any) => el.relationType === 'SEQUEL');

        if (!sequelExists) return buttonDisabled;

        const sequel = anime.relations.edges.filter((el: any) => el.relationType === 'SEQUEL');

        return (
            <button>
                <Link to={`/search/${sequel[0].node.id}`}>Sequel &rarr;</Link>
            </button>
        )
    };

    const animeTrailer = (): JSX.Element | null => {
        if (!screenWidth) return null;

        if (screenWidth < 768) {
            if (!anime?.trailer) return <button className={styles.info_trailer_mini} disabled={true}>Trailer &rarr;</button>

            const baseURL = anime?.trailer.site === 'youtube' ? 'https://www.youtube.com/watch?v=' : 'https://vimeo.com/';

            return (
                <button className={styles.info_trailer_mini}>
                    <a href={`${baseURL}${anime?.trailer.id}`} target="_blank" rel="noreferrer">Trailer &rarr;</a>
                </button>
            )
        } else {
            if (!anime?.trailer) {
                return (
                    <div className={styles.info_trailer_full_unavailable}>
                        <div>!</div>
                        <span>No Trailer Found</span>
                    </div>
                )
            } else {
                const baseURL = anime?.trailer.site === 'youtube' ? 'https://www.youtube.com/embed/' : 'https://vimeo.com/video/';

                return (
                    <div className={styles.info_trailer_full}>
                        <iframe 
                            title={`${anime.trailer.site} video player for trailer`}
                            height='100%' width='100%' 
                            frameBorder="false" 
                            allow="encrypted-media; gyroscope;" 
                            allowFullScreen 
                            src={`${baseURL}${anime.trailer.id}`} 
                        />
                    </div>
                )
            }
        }
    };

    return (
        <main className={styles.page}>
            <Navbar />
            {
                anime ? (
                    <>
                    <section className={styles.info_top}>

                        <div className={styles.info_top_title}>
                            <h1>{anime.title.romaji || anime.title.native}</h1>
                            <h2>{`(${anime.title.english || anime.title.native})`}</h2>
                        </div>

                        <div className={styles.info_top_layout}>

                            <div className={styles.info_basic}>

                                <div className={styles.info_card}>
                                    <img 
                                        src={anime.coverImage.large}
                                        alt={`promotional cover for ${anime.title.english || anime.title.romaji}`}
                                    />
                                    <div className={styles.info_card_stats}>
                                        <div>Score: {anime.averageScore || 'N/A'}</div>
                                        <div>Format: {animeFormat()}</div>
                                        <div>Episodes: {anime.episodes || '-'}</div>
                                        <div>Released: {anime.startDate.year}</div>
                                        <div>By: {animeStudio()}</div>
                                    </div>
                                </div>
                            </div>

                            {animeTrailer()}

                        </div>

                        <img 
                            className={styles.info_top_clip}
                            src={SwoopClip}
                            alt=""
                            aria-hidden="true"
                        />
                    </section>

                    <section className={styles.summary}>
                        <h3>Summary</h3>
                        <p>
                            {
                                anime.description ? (
                                    Parser(anime.description)
                                ) : (
                                    <p>
                                        No summary or description found for this title
                                        <br></br><br></br><br></br>
                                    </p>
                                )
                            }
                        </p>
                    </section>

                    <section className={styles.info_bottom}>

                        <div className={styles.info_bottom_border}></div>

                        <div className={styles.related_links}>
                            {prequelLink()}
                            {sequelLink()}
                        </div>

                        <img 
                            src={Logo}
                            alt=""
                            aria-hidden="true"
                        />
                    </section>
                    </>
                ) : <PageLoading />
            }
        </main>
    )
};

export default Entry;