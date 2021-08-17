import React, { useState, useEffect } from 'react';
import Parser from 'react-html-parser';
import { singleQuery } from '../api/anilist';
import { Anime } from '../application/customTypes';

import Navbar from '../components/Navbar';

import Swoop from '../images/swoop_clip.svg';

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
        if (!anime) return 'unknown';

        const mainStudio = anime.studios.edges.filter(el => el.isMain);

        console.log(mainStudio);

        return mainStudio[0].node.name;
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
                                <h2>{`(${anime.title.english})`}</h2>

                                <div className={styles.info_card}>
                                    <img 
                                        src={anime.coverImage.large}
                                        alt={`promotional cover for ${anime.title.english}`}
                                    />
                                    <div className={styles.info_card_stats}>
                                        <div>Score: {anime.averageScore}</div>
                                        <div>Episodes: {anime.episodes}</div>
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
                            src={Swoop}
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
                    </>
                ) : null
            }
        </main>
    )
};

export default Entry;