export const dateToString = (date) => {
    const dateCopy = new Date(date);
    const year = dateCopy.getFullYear();
    const getMonthToString = (monthNumber) => {
        if (monthNumber === 0 ) return 'Jan';
        if (monthNumber === 1 ) return 'Feb';
        if (monthNumber === 2 ) return 'Mar';
        if (monthNumber === 3 ) return 'Apr';
        if (monthNumber === 4 ) return 'May';
        if (monthNumber === 5 ) return 'Jun';
        if (monthNumber === 6 ) return 'Jul';
        if (monthNumber === 7 ) return 'Sep';
        if (monthNumber === 8 ) return 'Sep';
        if (monthNumber === 9 ) return 'Oct';
        if (monthNumber === 10 ) return 'Nov';
        if (monthNumber === 11 ) return 'Dec';
    }
    const day = dateCopy.getDate();

    return `${getMonthToString(dateCopy.getMonth())} ${day}, ${year}`
};
export const clearObject = (obj) => {
    let newObj = {};
    for (let key in obj) {
        if (obj[key]) {
            newObj[key] = obj[key]
        }
    }
    return newObj;
};
export const compareTwoSimpleObjects = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
};
export const fromURLtoObj = (url) => {
    try {
        return JSON.parse(decodeURIComponent(url))
    } catch (e) {
        return {};
    }
};
export const fromObjToURL = (obj) => {
    return encodeURIComponent(JSON.stringify(clearObject(obj)));
};
export const fromSlugToName = (slug) => {
    return slug.match(/\b\w+/g).map(item => item[0].toUpperCase() + item.slice(1)).join(' ');
}
export const cutTextLength = (text, length) => {
    if (text.length > length && text.length > length - 3) {
        return text.split('').splice(0, length-3).join('') + '...';
    }
    return text;
}
export const fromDatesValuesToString = (DatesValues) => {
    return [...new Set(DatesValues.match(/\b\d\d\d\d\b/g)).keys()].join(" - ");
};
export const isMobile = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}
export const resizeImageUrl = (url) => {
    return url.replace('/media/', '/media/resize/640/-/');
}