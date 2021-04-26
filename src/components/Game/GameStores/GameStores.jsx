import React from 'react';
import styles from './GameStores.module.scss';

const GameStores = ({ stores, storesLink, ...props }) => (
    <div className={styles.GameStores} {...props}>
        <div className={styles.header}>
            WHERE TO BUY
            </div>
        <div className={styles.body}>
            {stores.map(store => (<a key={store.id} className={styles.body__item} rel='noopener noreferrer' target='_blank' href={storesLink.find(item => item.id === store.id).url}>
                {store.store.name} <span className={`icon-${store.store.slug}`}></span>
            </a>)
            )}
        </div>
    </div>
);


export default React.memo(GameStores);