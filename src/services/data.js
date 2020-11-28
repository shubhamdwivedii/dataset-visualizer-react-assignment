import dataset from "../dataset.json";
import { slice, get } from "lodash";

class DataClient {
    constructor() {
        this.sampleSize = 100; 
        this.sampleNo = 1; 
    }

    getData() {
        const startAt = (this.sampleNo - 1) * this.sampleSize;
        const endAt = startAt + this.sampleSize;
        this.sampleNo += 1; 
        return slice(get(dataset, 'data', []), startAt, endAt).map((elem) => ({ ...elem, id: elem.device_display_name.split(' ').join('_') }));;
    };
}


export default new DataClient(); 