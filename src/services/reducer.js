import dataClient from "./data";
import { uniqBy, map, union } from "lodash";

export const initialState = {
    temperature: [],
    wireless: [],  
    areas: [],
    areaNames: [],
}

const sorter = (a, b) => {
    if (a.device_display_name < b.device_display_name) {
        return -1; 
    } 
    if (a.device_display_name > b.device_display_name) {
        return 1; 
    }
    return 0; 
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
            if (!areaTempData.length) {
                return; 
            }
            const totalTemp = areaTempData.reduce((ac, cv) => ac + cv.reading, 0);
            const avgTemp = totalTemp/areaTempData.length; 
            // later filter out by last 1 hour data only
            const areaData = currentAreas.find(areadata => areadata.name === area);
            if (areaData) {
                areaData.temp_avg = avgTemp; // later calculate agains existing
            } else {
                currentAreas.push({
                    name: area, 
                    temp_avg: avgTemp, 
                })
            }
        });

        return {
            wireless: wireless, //.sort(sorter), 
            temperature: temperature, //.sort(sorter),
            // areaNames: union(state.areas, areas).sort(), 
            areas: currentAreas, 
        };
    } 

    return state; 
}

