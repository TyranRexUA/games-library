import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    withCredentials: false,
})

const key = 'key=867fb33d94c44750aa4a66abc128f6c8&';

const rawgAPI = {
    _getAllItems (data) {
        if (data.next) {
            return axios.get(data.next).then(response => response.data)
           .then(response => {
                let JSON_DATA = JSON.parse(JSON.stringify(data))
                JSON_DATA.next = response.next;
                JSON_DATA.results = [...data.results, ...response.results];
                return this._getAllItems(JSON_DATA);
            })
        } else {
            return data;
        }
    },
    getMore(next) {
        return axios.get(next).then(response => response.data)
    },

    // getGames (params) {
    //     let newAxios = async(data) => {
    //         let z = await data.results.filter(item => item.genres.length < params.genres.split(',').length ? false : item.genres.every(item => params.genres.test(new RegExp(`\\b${item.id.toString()}\\b`))))
    //         console.log( data.results)
    //         if (z.length < 20) {
    //             return axios.get(data.next).then(response => response.data)
    //            .then(response => {
    //                 let JSON_DATA = JSON.parse(JSON.stringify({...data, next: response.next, results: [...data.results, ...response.results]}))

    //                 return newAxios(JSON_DATA);
    //             })
    //         } else {
    //             console.log('zzzzzzzzzzz', z, z.map((item => item.genres.length < params.genres.split(',').length ? false : item.genres.every(item => params.genres.match(`${item.id.toString()}`) ? true : false))))
    //             return {...data, results: z};
    //         }
    //     }

    getGames(params) {
        return instance.get(`games?${key}`, {
            params
            //params: { ...params, exclude_additions: true}
        }).then(response => {
            return response.data
        })
    },

    // getSimilarGames(gameId) {
    //     return instance.get(`games/${gameId}/suggested?${key}`).then(response => {
    //         return response.data})
    // },
    getSeriesGames(gameId) {
        return instance.get(`games/${gameId}/game-series?${key}`).then(response => {
            return this._getAllItems(response.data)
        })
    },

    getPlatforms() {
        return instance.get(`platforms?${key}page_size=40`).then(response => {
            return this._getAllItems(response.data);
        })
    },
    getGenres() {
        return instance.get(`genres?${key}page_size=40`).then(response => {
            return this._getAllItems(response.data);
        })
    },
    getStores() {
        return instance.get(`stores?${key}page_size=40`).then(response => {
            return this._getAllItems(response.data);
        })
    },
    getTags() {
        return instance.get(`tags?${key}page_size=40`).then(responde => responde.data)
    },
    getPublishers() {
        return instance.get(`publishers?${key}page_size=40`).then(responde => responde.data)
    },
    getDevelopers() {
        return instance.get(`developers?${key}page_size=40`).then(responde => responde.data)
    },
    getYears() {
        return instance.get(`games?${key}`).then(response =>{
            return response.data.filters.years
        })
    },

    getGameDetails(gameId) {
        return instance.get(`games/${gameId}?${key}`).then(response => response.data)
    },
    getGameScreenshots(gameId) {
        return instance.get(`games/${gameId}/screenshots?${key}`).then(response => {
            return this._getAllItems(response.data)
        }).then(response => response.results)
    },
    getGameTrailers(gameId) {
        return instance.get(`games/${gameId}/movies?${key}`).then(response => {
            return this._getAllItems(response.data)
        }).then(response => response.results)
    },
    getGameStores(gameId) {
        return instance.get(`games/${gameId}/stores?${key}`).then(response => {
            return this._getAllItems(response.data)
        }).then(response => response.results)
    },
    getGameDLCs(gameId) {
        return instance.get(`games/${gameId}/additions?${key}`).then(response => {
            return this._getAllItems(response.data)
        }).then(response => response.results)
    },
    getParentGame(gameId) {
        return instance.get(`games/${gameId}/parent-games?${key}`).then(response => {
            return this._getAllItems(response.data)
        }).then(response => response.results)
    },
}

export default rawgAPI;