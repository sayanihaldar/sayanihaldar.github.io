// utils/fetchPersonalData.ts

// Define Interfaces based on your CSV columns
export interface ReelPoseItem {
    type: string;
    link: string;
}

export interface WatchItem {
    name: string;
    type: string;
    genre: string;
    language: string;
    rewatch: string;
}

export interface DateIdeaItem {
    name: string;
    type: string;
    time: string;
}

export interface PlaceItem {
    place: string;
    type: string;
    time: string;
}

export interface DrawingItem {
    name: string;
    link: string; // Assuming 'Link' exists for image, if not we just show name
}

export interface PersonalData {
    watchList: WatchItem[];
    dateIdeas: DateIdeaItem[];
    drawings: DrawingItem[];
    reels: ReelPoseItem[];
    poses: ReelPoseItem[];
    places: PlaceItem[];
}

// URLs
const URLS = {
    watch: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=0&single=true&output=csv",
    date: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=529733113&single=true&output=csv",
    drawing: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=247934780&single=true&output=csv",
    reels: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=1530012655&single=true&output=csv",
    poses: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=1033295030&single=true&output=csv",
    visit: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=2131443786&single=true&output=csv"
};

async function fetchAndParse(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        const text = await res.text();
        // Regex to split CSV by comma, ignoring commas inside quotes
        const rows = text.split(/\r?\n/).slice(1).map(row => {
            const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
            return row.split(regex).map(cell => cell.replace(/^"|"$/g, '').trim());
        });
        return rows;
    } catch (e) {
        console.error(`Error fetching ${url}`, e);
        return [];
    }
}

export async function getPersonalData(): Promise<PersonalData> {
    const [watchRaw, dateRaw, drawingRaw, reelsRaw, posesRaw, visitRaw] = await Promise.all([
        fetchAndParse(URLS.watch),
        fetchAndParse(URLS.date),
        fetchAndParse(URLS.drawing),
        fetchAndParse(URLS.reels),
        fetchAndParse(URLS.poses),
        fetchAndParse(URLS.visit)
    ]);

    return {
        watchList: watchRaw.map(r => ({ name: r[0], type: r[1], genre: r[2], language: r[4], rewatch: r[5] })).filter(i => i.name),
        dateIdeas: dateRaw.map(r => ({ name: r[0], type: r[1], time: r[2] })).filter(i => i.name),
        drawings: drawingRaw.map(r => ({ name: r[0], link: r[1] })).filter(i => i.name),
        reels: reelsRaw.map(r => ({ type: r[0], link: r[1] })).filter(i => i.link),
        poses: posesRaw.map(r => ({ type: r[0], link: r[1] })).filter(i => i.link),
        places: visitRaw.map(r => ({ place: r[0], type: r[1], time: r[2] })).filter(i => i.place),
    };
}