
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Not Found</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Could not find requested resource</p>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Return Home
            </Link>
        </div>
    )
}
