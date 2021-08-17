import React, { useState, useEffect } from 'react';
import { singleQuery } from '../api/anilist';
import { Anime } from '../application/customTypes';

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

    const [ anime, setAnime ] = useState<Anime>();

    useEffect(() => {
        const animeID = parseInt(match.params.id);
        singleQuery(animeID)
            .then((data) => {
                console.log(data.data.Media);
                setAnime(data.data.Media);
            })
    }, [match.params.id]);

    setTimeout(() => {
        console.log(anime)
    }, 3000);

    return (
        <div>
            Entry
        </div>
    )
};

export default Entry;