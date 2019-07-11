const request = require('request');
const _ = require('lodash')


const requestOptions = {
    url: 'https://www.yad2.co.il/api/feed/get',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
    },
    qs: {
        cat: 2,
        subcat: 2,
        city: 8600,
        property: [1, 3],
        rooms: "3--1",
        price: "-1-6000",
        parking: 1,
        EnterDate: '1-10-2019'

    },
    json: true
}

const callApi = () => {
    return new Promise((resolve, reject) => {
        try {
            request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error)
                }
                else {
                    const { total_items, feed_items } = _.get(body, 'feed')
                    const appartments = feed_items.filter((i) => i.type === 'ad')
                    resolve({ total_items, appartments })
                }
            })
        }
        catch (error) {
            reject(error)
        }
    })
}


module.exports = callApi