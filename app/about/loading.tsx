import LoadingComp from "@/components/LoadingComp";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100">
            <h1 className="text-8xl font-serif text-primary animate-pulse-fast"> SH </h1>
        </div>
    );
}