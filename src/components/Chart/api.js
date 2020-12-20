const moment = require('moment')
import { format } from 'moment'

// Extra function so I can lazily default export without learning how to do it to a constant
export default function getSoupData(id) {
    // Returns a promise
    return fetchSoupData(id)
}

const fetchSoupData = (id) => {

    return (fetch(`https://abasoup.herokuapp.com/api/supervisions?staff_id=${id}`)
    .then((res) => {
        if (res.ok) {
            console.log('SUCCESS')
        } else {
            console.log('FAILURE')
        }
        return res.json()
    })
    .then((data) => {
        const { soups } = data

        const soupData = {
            totals: [],
            startings: [],
            conductings: [],
            endings: [],
            labels: [],
            loading: true
        }

        soups.map((soup) => {
            // If the data is not a valid fraction - don't render this point
            console.log(soup.starting)
            if (isDenomZero(soup)) {
                console.log('Skipping this one.')
            } else {
                let total = formatDataPoint(soup.total)
                let starting = formatDataPoint(soup.starting)
                let conducting = formatDataPoint(soup.conducting)
                let ending = formatDataPoint(soup.ending)

                // Passes off the formatted data points
                soupData.totals.push(total)
                soupData.startings.push(starting)
                soupData.conductings.push(conducting)
                soupData.endings.push(ending)

                // Passes each Soup's date to be used as a label on the X-Axis
                soupData.labels.push(soup.date)
            }
                
        })
        // Sorts soup by longest ago to most recent
        soupData.labels = soupData.labels.reverse()

        // Let's the Chart Component know it can render
        soupData.loading = false
        return soupData
    }))
}

const isDenomZero = (soup) => {
    const denom = soup.total.split('/')[1]
    return denom === '0' ? true : false
}

const formatDataPoint = (datapoint) => {
    const [num, denom] = datapoint.split('/')
    return(parseInt((parseInt(num)/parseInt(denom) * 100)))
}