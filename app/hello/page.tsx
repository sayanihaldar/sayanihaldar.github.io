// const watchRecomendationURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=0&single=true&output=csv"
// const dateIdeasURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=529733113&single=true&output=csv"
// const drawingURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=247934780&single=true&output=csv"
// const reelsURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=1530012655&single=true&output=csv"
// const poseIdeasURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=1033295030&single=true&output=csv"
// const toVisitURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhstx11rXHgS825krsQsjRX30mZUxQ8Gvzs4qurK2Vx7lo3-e8fiIF6vVvfQPCbeUYj3NBqGQ7W2e/pub?gid=2131443786&single=true&output=csv"

// app/personal/page.tsx
import { getPersonalData } from "@/utils/fetchPersonalData";
import PersonalDashboard from "@/components/PersonalDashboard";
import { Navbar } from "@/components/navbar";
import Flower from "@/components/flower";
import { Footer } from "@/components/footer";

export default async function PersonalPage() {
    const data = await getPersonalData();

    return (
        <main className="min-h-screen">
            <Navbar />
            <Flower />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 pt-24">
                <h1 className="mb-8 text-5xl md:text-6xl lg:text-6xl font-bold text-center tracking-tight leading-none text-primary">
                    Sayani's World
                </h1>
                <PersonalDashboard data={data} />
            </div>
            <Footer />
        </main>
    );
}