
import { services } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";


export function generateStaticParams() {
    return services.map((service) => ({
        id: service.id,
    }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const service = services.find((s) => s.id === id);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${service.title} - Care.xyz`,
        description: service.description,
    };
}

export default async function ServiceDetailPage({ params }) {
    const { id } = await params;

    const service = services.find((s) => s.id === id);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="h-64 w-full bg-blue-100 flex items-center justify-center">
                        <span className="text-6xl">🩺</span>
                        {/* Image would go here */}
                    </div>
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h1>
                        <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-6">
                            ${service.pricePerDay} / day
                        </p>
                        <div className="prose dark:prose-invert max-w-none mb-8">
                            <h3 className="text-xl font-semibold mb-2">Description</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                {service.longDescription}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mt-4">
                                {service.description}
                            </p>
                        </div>

                        <div className="flex justify-start">
                            <Link
                                href={`/booking/${service.id}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg"
                            >
                                Book This Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
