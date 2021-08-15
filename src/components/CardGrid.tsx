import React from 'react';
import { AnimeList } from '../application/customTypes';

import CardMini from './CardMini';

import styles from './CardGrid.module.scss';

interface Props {
    animeList: AnimeList | null;
}

const CardGrid: React.FC<Props> = ({ animeList }) => {

    const generateGrid: any = () => {
        if (!animeList) return null;

        return animeList.media.map((el, index) => (
            <CardMini 
                key={`mini-card-${index}`}
                anime={el}
                index={index}
                isRecommendation={false}
            />
        ))
    };

    return (
        <div className={styles.card_grid}>
            {generateGrid()}
        </div>
    )
};

export default CardGrid;