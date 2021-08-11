import React from 'react';

import Logo from '../images/anireka.svg';
import Clip from '../images/clip-slash.svg';

import styles from './HeaderSlash.module.scss';

const HeaderSlash: React.FC = () => {

    return (
        <header className={styles.header}>
            <div className={styles.header_content}>
                <h1>AniReka</h1>
                <h2>Search for hidden anime gems, <br/>Get fresh recommendations</h2>

                <div className={styles.button_container}>
                    <button>Browse</button>
                    <button>Featured</button>
                </div>
            </div>

            <div className={styles.side_banner}>
                推<br/>奨<br/>事<br/>項
            </div>

            <div className={styles.bottom_border}>

                <img 
                    src={Clip}
                    className={styles.clip}
                    alt=""
                    aria-hidden="true"
                />

                <img 
                    src={Logo}
                    className={styles.logo}
                    alt=""
                    aria-hidden="true"
                />

            </div>

        </header>
    )
};

export default HeaderSlash;