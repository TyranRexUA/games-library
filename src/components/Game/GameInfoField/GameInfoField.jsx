import React from 'react';
import styles from './GameInfoField.module.scss';
import { NavLink } from 'react-router-dom';
import { fromObjToURL } from '../../../secondaryFunctions/secondaryFunctions';

const GameInfoBlock = ({items, paramName}) => {
    const withoutId = paramName === 'tags' || paramName === 'developers' || paramName === 'publishers';

    return (
        <div className={styles.InfoField}>
            <div className={styles.header}>
                {paramName.toUpperCase()}
            </div>
            <div className={styles.body}>
                {
                    (paramName==='platforms'
                        && items.map(item =>
                            (<NavLink key={item.platform.id} className={styles.body__item} to={`/filter/${fromObjToURL({[paramName]: item.platform.id.toString()})}`}>{item.platform.name}</NavLink>)
                        )
                    )
                    || (withoutId
                        && items.map(item =>
                            (<NavLink key={item.id} className={styles.body__item} to={`/filter/${fromObjToURL({ [paramName]: item.slug })}`}>{item.name}</NavLink>)
                        )
                    )
                    || (items
                        && items.map(item =>
                            (<NavLink key={item.id} className={styles.body__item} to={`/filter/${fromObjToURL({ [paramName]: item.id.toString() })}`}>{item.name}</NavLink>)
                        )
                    )
                }
            </div>
        </div>
    )
}

export default React.memo(GameInfoBlock);