
import Link from "next/link";
import Image from "next/image";

export default function ServiceCard({ service }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="relative h-48 w-full bg-gray-200">
                {/* Placeholder for image if not found */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-4xl">🩺</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{service.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">${service.pricePerDay}/day</span>
                    <Link
                        href={`/service/${service.id}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
