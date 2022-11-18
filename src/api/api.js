import { cursors, devices } from "../utils/constantData";

class SwapiService {
    async getCursors() {
        // const res = await fetch();
        // if (!res.ok) {
        //     throw new Error(`Could not fetch, reseived ${res.status}`);
        // }

        // return await res.json();

        return await cursors;
    }

    async getDevices() {
        return await devices;
    }
}

const swapi = new SwapiService();

export default swapi;