import React, { useState, useEffect } from 'react';
import { specificListQuery } from '../api/anilist';
import { MediaMini } from '../application/customTypes';
import useWindowDimensions from '../hooks/useWindowDimensions';

import CardMini from './CardMini';

import Wave from '../images/wave.svg';

import styles from './FeaturedSectionHome.module.scss';

//optimize featuredRowsMobile/Desktop to be a more concise single function

const FeaturedSectionHome: React.FC<{}> = () => {

    const { screenWidth } = useWindowDimensions();

    const [ featuredAction, setFeaturedAction ] = useState<Array<MediaMini>>();
    const [ featuredDrama, setFeaturedDrama ] = useState<Array<MediaMini>>();
    const [ featuredPsychological, setFeaturedPsychological ] = useState<Array<MediaMini>>();

    useEffect(() => {
        specificListQuery([113415, 21507, 10087, 128546, 205, 777, 889, 11061, 100298, 16498, 2001, 1292])
            .then(data => {
                setFeaturedAction(data.data.Page.media);
            });

        specificListQuery([128547, 9253, 6114, 107660, 245, 110349, 6746, 20607, 1210, 100388, 101291, 239])
            .then(data => {
                setFeaturedDrama(data.data.Page.media);
            });

        specificListQuery([13601, 13125, 19, 9756, 30, 790, 97986, 98707, 20931, 3002, 43, 323])
            .then(data => {
                setFeaturedPsychological(data.data.Page.media);
            });
    }, [])

    const featuredRowsMobile = (featuredAnimes: Array<MediaMini>, genre: string): JSX.Element => {
        const row1 = (): JSX.Element => {
            let jsx = [];

            for (let i = 0; i < 3; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }
        const row2 = (): JSX.Element => {
            let jsx = [];

            for (let i = 3; i < 6; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }
        const row3 = (): JSX.Element => {
            let jsx = [];

            for (let i = 6; i < 9; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }
        const row4 = (): JSX.Element => {
            let jsx = [];

            for (let i = 9; i < 12; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }

        return (
            <>
                {row1()}
                {row2()}
                {row3()}
                {row4()}
            </>
        )
    };

    const featuredRowsDesktop = (featuredAnimes: Array<MediaMini>, genre: string): JSX.Element => {
        const row1 = (): JSX.Element => {
            let jsx = [];

            for (let i = 0; i < 4; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }
        const row2 = (): JSX.Element => {
            let jsx = [];

            for (let i = 4; i < 8; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }
        const row3 = (): JSX.Element => {
            let jsx = [];

            for (let i = 8; i < 12; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }

        return (
            <>
                {row1()}
                {row2()}
                {row3()}
            </>
        )
    };

    return (
        <section className={styles.featured} id="featured">
            
            <h2>Featured Anime</h2>

            <div className={styles.featured_sliders}>

                <img 
                    src={Wave}
                    alt=""
                    aria-hidden="true"
                />

                <section>
                    <h3>Action</h3>
                    <div className={styles.slider}>
                        {
                            featuredAction ? (
                                screenWidth && screenWidth > 768 ? (
                                    featuredRowsDesktop(featuredAction, 'action')
                                ) : (
                                    featuredRowsMobile(featuredAction, 'action')
                                )
                            ) : null
                        }
                    </div>
                </section>
                <section>
                    <h3>Drama</h3>
                    <div className={styles.slider}>
                        {
                            featuredDrama ? (
                                screenWidth && screenWidth > 768 ? (
                                    featuredRowsDesktop(featuredDrama, 'drama')
                                ) : (
                                    featuredRowsMobile(featuredDrama, 'drama')
                                )
                            ) : null
                        }
                    </div>
                </section>
                <section>
                    <h3>Psychological</h3>
                    <div className={styles.slider}>
                        {
                            featuredPsychological ? (
                                screenWidth && screenWidth > 768 ? (
                                    featuredRowsDesktop(featuredPsychological, 'psychological')
                                ) : (
                                    featuredRowsMobile(featuredPsychological, 'psychological')
                                )
                            ) : null
                        }
                    </div>
                </section>
            </div>

        </section>
    )
};

export default FeaturedSectionHome;