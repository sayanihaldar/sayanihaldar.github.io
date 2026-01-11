import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Navbar } from '@/components/navbar'

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-center px-4">
            <Navbar />
            <h1 className="text-9xl font-bold text-[#8a1c4b]">404</h1>
            <h2 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h2>
            <p className="text-gray-500 max-w-md mb-8">
                Oops! It seems like the canvas is empty here. The page you are looking for doesn't exist or has been moved.
            </p>

            <Link href="/">
                <Button className="bg-[#8a1c4b] hover:bg-[#70163c] text-white rounded-xl px-8 py-6 text-lg">
                    Return Home
                </Button>
            </Link>
        </div>
    )
}