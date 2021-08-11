import React, { useEffect } from 'react';
import { recommendationsQuery } from '../api/anilist';

import styles from './RecommendationsTab.module.scss';

interface Props {
    sourceID: number;
}

const RecommendationsTab: React.FC<Props> = ({ sourceID }) => {

    useEffect(() => {
        recommendationsQuery(sourceID, 1)
            .then(data => console.log(data.data.Media));
    }, [sourceID])

    return (
        <div className={styles.tab}>
            {/* put flex row of 3 cards with forward and back options of CardMini with isRecommendation=true */}
        </div>
    )
};

export default RecommendationsTab;