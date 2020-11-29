import React, { useState, useEffect } from "react";
import styles from "./FieldSet.module.scss";
import Preloader from "../../Preloader/Preloader";
import cn from "classnames";
import { fromSlugToName, fromDatesValuesToString } from "../../../secondaryFunctions/secondaryFunctions";

const FieldSet = ({ title, items, activeItem, isLoading, next, filtersIsActive, groups, ...props }) => {
    const [isHiddenBody, setIsHiddenBody] = useState(true);

    // ЕСЛИ КНОПКА АКТИВИРУЮЩАЯ Filters НЕ АКТИВНА, ТО СКРЫВАЕТ(display: none) ТЕЛО FieldSet(FIELDSET BODY), ИНАЧЕ ИЗ-ЗА МНОЖЕСТВА ОБЬЕКТОВ В Flex КОНТЕЙНЕРЕ ПРИ ИХ СМЕЩЕНИИ ПРОИСХОДЯТ ПОДЛАГИ
    useEffect(() => {
        if (!filtersIsActive) {
            setIsHiddenBody(true)
        }
    }, [filtersIsActive])

    // СКРЫТЬ FIELDSET BODY И ЗАДИСПАТЧИТЬ ПАРАМЕТРЫ
    const handleItemClick = (data) => {
        props.changeParams(data);
        setIsHiddenBody(!isHiddenBody);
    };

    const getMoreItems = (next) => {
        if (!props.isLoading) {
            props.getMoreItems(next)
        }
    };

    // ФИЛЬТР ПО ЭТИМ ПАРАМЕТРАМ ИЩЕТ НЕ ПО ID
    const withoutId = title === 'Tags' || title === 'Developers' || title === 'Publishers';

    return (
        <div className={styles.FieldSet}>

            {/* FIELDSET HEADER */}
            <div
                className={styles.header}
                onClick={() => setIsHiddenBody(!isHiddenBody)}
            >
                <span>{title}</span>

                {/* ЕСЛИ ЕСТь activeItem = выбран фильтр И ЕСТЬ Items ВНЕ ГРУППЫ ИЛИ ГРУППА, ТО ПОКАЗ. activeItem */}
                {( (items && activeItem) || (groups && activeItem) ) && (
                    <div className={styles.deleteActiveItem}
                        onClick={(event) => {
                            props.changeParams(null);
                            event.stopPropagation();
                        }}
                    >
                        {withoutId
                            ? fromSlugToName(activeItem)
                            : items && items.find((item) => {
                                const itemId = item.id.toString();
                                return activeItem === itemId;
                            }).name
                        }
                        {groups && fromDatesValuesToString(activeItem)}

                        {/* <div className={styles.deleteActiveItem__icon}></div> */}
                    </div>
                )}

            </div>

            {/* FIELDSET BODY */}
            <div
                className={cn(styles.body, { [styles.body_hidden]: isHiddenBody })}
            >
                {/* {FIELDSET BODY ITEMS} */}

                {/* ЕСЛИ ITEMS ВНЕ ГРУППЫ */}
                {items
                    ? (
                        items.map((item) => {
                            const itemId = item.id.toString();

                            return (
                                <div
                                    key={item.id}
                                    className={cn(styles.body__item, { [styles.activeItem]: activeItem === itemId || activeItem === item.slug})}
                                    onClick={ () => handleItemClick(withoutId ? item.slug : itemId) }
                                >
                                    {item.name}
                                </div>
                            );
                        })
                    )

                    // ЕСЛИ ВМЕСТО ITEMS ГРУППА
                    : groups
                        ? (
                            groups.map((group) => (
                                <div key={group.decade} className={styles.group}>
                                    <>
                                        <div
                                            className={cn(styles.group__header, { [styles.activeItem]: activeItem === group.filter })}
                                            onClick={() => handleItemClick(group.filter)}
                                        >
                                            {fromDatesValuesToString(group.filter)}
                                        </div>

                                        {group.years.length !== 1 && (
                                            <div className={styles.group__body}>

                                                {group.years.map((year) => {
                                                    const yearType = `${year.year}-01-01,${year.year}-12-31`;

                                                    return (
                                                        <div
                                                            key={year.year}
                                                            className={cn(styles.body__item, { [styles.activeItem]: activeItem === yearType })}
                                                            onClick={() => handleItemClick(yearType)}
                                                        >
                                                            {year.year}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </>
                                </div>
                            ))
                        )

                        :<Preloader style={{ height: "200px" }} />
                }

                {/* ПОКАЗ PRELOADER КОГДА IsLoading И ЕСТЬ СЛЕДУЮЩАЯ СТРАНИЦА ДАННЫХ */}
                {next &&
                    (isLoading
                    ? <Preloader style={{ height: "50px" }} />
                    : <div className={styles.loadBtn}>
                        <div onClick={() => getMoreItems(next)}>Load More</div>
                    </div>)
                }
                <div
                    className={styles.closeBtn}
                    onClick={() => setIsHiddenBody(true)}
                />
            </div>


        </div>
    );
};

export default React.memo(FieldSet);
