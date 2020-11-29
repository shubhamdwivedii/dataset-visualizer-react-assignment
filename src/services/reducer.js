import dataClient from "./data";
import moment from "moment";
import { uniqBy, map, union, isEqual } from "lodash";

export const initialState = {
    temperature: [],
    wireless: [],
    areas: [],
    areaList: [],
}

// const sorter = (a, b) => {
//     if (a.device_display_name < b.device_display_name) {
//         return -1; 
//     } 
//     if (a.device_display_name > b.device_display_name) {
//         return 1; 
//     }
//     return 0; 
// }


const checkTime = (timestamp) => {
    const now = new Date(); 
    const time = new Date(timestamp);
    let diff = (now.getTime() - time.getTime())/1000; 
    diff /= 60; 
    return (Math.abs(Math.round(diff)) <= 60)
}

export const reducer = (state, action) => {
    if (action.type === "NEXT_POLL") {
        const dataset = dataClient.getData();
        const areas = map(uniqBy(dataset, 'device_display_name'), 'device_display_name');
        const wireless = dataset.filter(data => data.device_type === "Wireless");
        const temperature = dataset.filter(data => data.device_type === "Temperature");

        const currentAreas = [...state.areas]

        areas.forEach(area => {
            const areaTempData = temperature.filter(tmp => tmp.device_display_name === area);
            const areaWrlssData = wireless.filter(wrl => wrl.device_display_name === area);
            if (!areaTempData.length) {
                return;
            }

            const areaData = currentAreas.find(areadata => areadata.name === area);

            if (areaData) {
                const mergedAreaTempData = areaData.temp_data.concat(areaTempData.map(atd => ({ reading: atd.reading, time: moment(atd.time).format('MMMM Do YYYY, h:mm:ss a'), type: "Temperature", timestamp: new Date().toISOString() }))).filter(tData => checkTime(tData.timestamp))
                const mergedAreaWrlssData = areaData.wrlss_data.concat(areaWrlssData.map(awd => ({ reading: awd.reading, time: moment(awd.time).format('MMMM Do YYYY, h:mm:ss a'), type: "Wireless", timestamp: new Date().toISOString() }))).filter(tData => checkTime(tData.timestamp))

                const totalTemp = mergedAreaTempData.reduce((ac, cv) => ac + cv.reading, 0);
                const avgTemp = totalTemp / mergedAreaTempData.length;

                const totalWrlss = mergedAreaWrlssData.reduce((ac, cv) => ac + cv.reading, 0);
                const avgWrlss = totalWrlss / mergedAreaWrlssData.length;

                areaData.temp_avg = avgTemp;
                areaData.wrlss_avg = avgWrlss;
                areaData.temp_data = mergedAreaTempData;
                areaData.wrlss_data = mergedAreaWrlssData;
            } else {
                const totalTemp = areaTempData.reduce((ac, cv) => ac + cv.reading, 0);
                const avgTemp = totalTemp / areaTempData.length;

                const totalWrlss = areaWrlssData.reduce((ac, cv) => ac + cv.reading, 0);
                const avgWrlss = totalWrlss / areaWrlssData.length;

                currentAreas.push({
                    name: area,
                    wrlss_avg: avgWrlss, 
                    temp_avg: avgTemp,
                    temp_data: areaTempData.map(atd => ({ reading: atd.reading, time: moment(atd.time).format('MMMM Do YYYY, h:mm:ss a'), type: "Temperature", timestamp: new Date().toISOString() })), // last 1 hour only
                    wrlss_data: areaWrlssData.map(awd => ({ reading: awd.reading, time: moment(awd.time).format('MMMM Do YYYY, h:mm:ss a'), type: "Wireless", timestamp: new Date().toISOString() })),
                })
            }
        });

        const updatedAreaList = union(state.areaList, areas);
        return {
            ...state,
            wireless: wireless, //.sort(sorter), 
            temperature: temperature, //.sort(sorter),
            ...(!isEqual(state.areaList, updatedAreaList) && { areaList: updatedAreaList.sort() }),
            areas: currentAreas,
        };
    }

    return state;
}

