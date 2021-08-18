import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'react-html-parser';
import { singleQuery } from '../api/anilist';
import { Anime } from '../application/customTypes';

import Navbar from '../components/Navbar';

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

    useEffect(() => {
        const animeID = parseInt(match.params.id);
        singleQuery(animeID)
            .then((data) => {
                console.log(data.data.Media);
                setAnime(data.data.Media);
            })
    }, [match.params.id]);

    const animeStudio = () => {
        if (!anime) return 'Unknown';

        const mainStudio = anime.studios.edges.filter(el => el.isMain);

        return mainStudio[0].node.name;
    };

    const animeFormat = () => {
        if (!anime) return 'Unknown';

        switch(true) {
            case anime.format === 'MOVIE':
                return 'Movie';
            case anime.format === 'TV_SHORT':
                return 'TV Short';
            case anime.format === 'SPECIAL':
                return 'Special';
            case anime.format === 'MUSIC':
                return 'Music Format';
            default:
                return anime.format;
        }
    };

    const prequelLink = () => {
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

    const sequelLink = () => {
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

    return (
        <main className={styles.page}>
            <Navbar />
            {
                anime ? (
                    <>
                    <section className={styles.info_top}>

                        <div className={styles.info_top_layout}>

                            <div className={styles.info_basic}>

                                <h1>{anime.title.romaji || anime.title.native}</h1>
                                <h2>{`(${anime.title.english || anime.title.native})`}</h2>

                                <div className={styles.info_card}>
                                    <img 
                                        src={anime.coverImage.large}
                                        alt={`promotional cover for ${anime.title.english || anime.title.romaji}`}
                                    />
                                    <div className={styles.info_card_stats}>
                                        <div>Score: {anime.averageScore}</div>
                                        <div>Format: {animeFormat()}</div>
                                        <div>Episodes: {anime.episodes || '-'}</div>
                                        <div>Released: {anime.startDate.year}</div>
                                        <div>By: {animeStudio()}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.info_trailer}>
                                Preview
                            </div>

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
                            {Parser(anime.description)}
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
                ) : null
            }
        </main>
    )
};

export default Entry;