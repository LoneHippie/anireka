import React from 'react';
import { AnimeList, Genres } from '../application/customTypes';

import CardMini from './CardMini';

import styles from './CardGrid.module.scss';

enum GridType {
    Top,
    Genre,
    Search
}

interface Props {
    gridType: GridType;
    gridGenres: Array<Genres>;
    animeList: AnimeList | null;
}

const CardGrid: React.FC<Props> = ({ gridType, gridGenres, animeList }) => {

    const generateGrid: any = () => {
        if (!animeList) return null;

        return animeList.media.map((el, index) => (
            <CardMini 
                key={`mini-card-${index}`}
                anime={el}
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