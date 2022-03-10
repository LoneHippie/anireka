import React, { Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MediaMini } from '../../application/customTypes';
import useCardMini from './useCardMini';
import useOnScreen from '../../hooks/useOnScreen';

import Swoop from '../../images/swoop_card.svg';
import Rating from '../../images/rating.svg';

import styles from './CardMini.module.scss';

interface Props {
    anime: MediaMini;
    isRecommendation: boolean;
}

const CardMini: React.FC<Props> = ({ anime, isRecommendation }) => {

    const {
        history,
        episodeStatus,
        shortenedTitle,
        showCardoptions,
        showRecommendations,
        setShowCardOptions,
        setShowReccomendations
    } = useCardMini(anime);

    const ref = useRef<HTMLDivElement>(null);
    const inView = useOnScreen(ref);

    let blurTimer: any; //for preventing blur firing on child elements of component

    const RecommendationsTab = React.lazy(() => import('../RecommendationsTab'));

    return (
        <>
            <div 
                className={styles.card}
                tabIndex={0}
                ref={ref}
                style={{
                    transform: inView || isRecommendation ? 'translate(0)' : 'translateY(8rem)',
                    opacity: inView || isRecommendation ? 1 : 0
                }}
                onClick={() => {
                    if (!isRecommendation) {
                        setShowCardOptions(true)
                    } else {
                        history.push(`/entry/${anime.id}`)
                    }
                }}
                onFocus={() => {
                    clearTimeout(blurTimer)
                }}
                onBlur={() => {
                    if (showCardoptions) {
                        blurTimer = setTimeout(() => {
                            setShowCardOptions(false)
                        });
                    }
                }}
            >
                
                <div className={styles.section_top}>

                    <div className={styles.info_top}>
                        <div>{episodeStatus()}</div>
                        <div className={styles.info_score}>
                            <img src={Rating} alt="" aria-hidden="true" />
                            <div>{anime.averageScore || 'N/A'}</div>
                        </div>
                    </div>

                    <img 
                        src={Swoop}
                        alt=""
                        aria-hidden="true"
                        className={styles.bg_top}
                    />

                </div>

                <div className={styles.coverimage}>
                    <img 
                        src={anime.coverImage.large || anime.coverImage.medium}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                    />
                </div>

                <div className={styles.card_title}>
                    {anime.title.english?.length ? shortenedTitle(anime.title.english) : anime.title.romaji}
                </div>

                <div 
                    className={styles.section_bottom}
                    style={{
                        height: showCardoptions ? '100%' : '30%'
                    }}
                >

                    {
                        showCardoptions ? (
                            <div 
                                className={styles.options_bottom}
                            >
                                <button>
                                    <Link to={`/entry/${anime.id}`}>More Info</Link>
                                </button>

                                <button onClick={() => setShowReccomendations(true)}>
                                    Related
                                </button>
                            </div>
                        ) : (
                            <div className={styles.info_bottom}>
                                {anime.title.native}
                            </div>
                        )
                    }

                    <img 
                        src={Swoop}
                        alt=""
                        aria-hidden="true"
                        className={styles.bg_bottom}
                    />

                </div>

            </div>
            
            {
                showRecommendations ? (
                    <>
                        <Suspense fallback={<div className={styles.reco_placeholder}></div>}>
                            <RecommendationsTab 
                                sourceID={anime.id}
                            />
                        </Suspense>

                        <div 
                            className={styles.reco_blur}
                            onClick={() => setShowReccomendations(false)}
                        ></div>
                    </>
                ) : null
            }
        </>
    )
};

export default CardMini;