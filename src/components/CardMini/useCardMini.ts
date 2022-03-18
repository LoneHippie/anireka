import { MediaMini } from '../../application/customTypes';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const useCardMini = (anime: MediaMini) => {

    const episodeStatus = (): string => {
        if (anime.format === 'MOVIE') return 'Movie';
        if (anime.format === 'MUSIC') return 'Music Video';

        if (anime.status === 'FINISHED') {
            return `Ep: ${anime.episodes}`;
        } else if (anime.status === 'NOT_YET_RELEASED') {
            return 'Unreleased';
        } else {
            return 'Ongoing';
        }
    };

    const navigate = useNavigate();

    const shortenedTitle = (title: string): string => {
        let formattedTitle: string | string[];
        let wordLength: number = 9;

        formattedTitle = title.split(' ');

        if (formattedTitle.length > wordLength) {
            for (let i = formattedTitle.length; i > wordLength; i--) {
                formattedTitle.pop();
            }
            return formattedTitle.join(' ') + '...';
        } else {
            return title;
        }
    };

    const [ showCardoptions, setShowCardOptions ] = useState<boolean>(false);
    const [ showRecommendations, setShowReccomendations ] = useState<boolean>(false);

    return {
        navigate,
        episodeStatus,
        shortenedTitle,
        showCardoptions,
        showRecommendations,
        setShowCardOptions,
        setShowReccomendations
    }
}

export default useCardMini;