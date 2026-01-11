// utils/fetchResume.ts

export async function getResumeData() {
    const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=801782992&single=true&output=csv";

    const response = await fetch(SHEET_URL, { next: { revalidate: 3600 } });
    const text = await response.text();

    // 1. Parse CSV (handling quoted commas)
    const rows = text.split(/\r?\n/).slice(1).map(row => {
        const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        return row.split(regex).map(cell => cell.replace(/^"|"$/g, '').trim());
    });

    // 2. Extract Skills (Column A)
    const skills = rows
        .map(row => row[0])
        .filter(Boolean); // Removes empty rows

    const experiences = rows
        .filter(row => row[1] && row[2]) // Ensure Company & Role exist
        .reverse()
        .map((row, index) => {
            const isOdd = index % 2 === 0;

            return {
                company: row[1],
                title: row[2],
                period: row[3],
                skills: row[4] ? row[4].split(',').map(s => s.trim()) : [],
                description: row[5] || "",
                color: isOdd ? "oklch(0.68 0.2 10)" : "oklch(0.58 0.16 155)"
            };
        });

    return { skills, experiences };
}