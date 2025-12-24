"use client";

import { motion } from "framer-motion";
import { Baby, Armchair, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/data"; // Assuming services data might be useful, or we hardcode the 3 categories

const serviceCategories = [
    {
        id: "baby-care", // Map to actual IDs if possible, or use generic
        title: "Baby Care",
        description: "Nurturing and safe babysitting for your little ones. We ensure a secure environment for their growth and play.",
        icon: <Baby className="w-8 h-8 text-blue-500" />,
        color: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-100 dark:border-blue-800"
    },
    {
        id: "elderly-care",
        title: "Elderly Care",
        description: "Dignified companionship and daily assistance for seniors. We help maintain independence and quality of life.",
        icon: <Armchair className="w-8 h-8 text-teal-500" />,
        color: "bg-teal-50 dark:bg-teal-900/20",
        borderColor: "border-teal-100 dark:border-teal-800"
    },
    {
        id: "sick-care",
        title: "Specialized Care",
        description: "Professional support for recovery and chronic conditions. Monitoring and comfort for sick individuals.",
        icon: <Activity className="w-8 h-8 text-rose-500" />,
        color: "bg-rose-50 dark:bg-rose-900/20",
        borderColor: "border-rose-100 dark:border-rose-800"
    }
];

export default function ServicesOverview() {
    return (
        <section id="services" className="py-24 bg-slate-50 dark:bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Comprehensive Care Services
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Whether you need a helping hand with children, support for aging parents, or special attention for a loved one.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {serviceCategories.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className={`p-8 rounded-2xl bg-white dark:bg-gray-800 border ${service.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 group`}
                        >
                            <div className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center mb-6 is-icon`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <Link
                                href={`/service/${service.id}`}
                                className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:translate-x-1 transition-transform"
                            >
                                Learn more <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
