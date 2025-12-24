"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Finding a trustworthy babysitter was always a nightmare until I found Care.xyz. The process was so transparent and the sitter was amazing with my kids.",
        name: "Sarah Jenkins",
        role: "Mother of two"
    },
    {
        quote: "The elderly care service for my father has been a blessing. The caregiver is professional, kind, and punctual. I finally have peace of mind.",
        name: "Michael Ross",
        role: "Son of patient"
    },
    {
        quote: "Highly recommended for post-surgery care. The nurse knew exactly what to do and made my recovery so much more comfortable at home.",
        name: "Emily Dao",
        role: "Patient"
    }
];

const stats = [
    { label: "Families Served", value: "2,500+" },
    { label: "Care Hours Delivered", value: "50,000+" },
    { label: "Satisfaction Rate", value: "98%" },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Trusted by Thousands of Families
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Don't just take our word for it. Here is what our community says.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-slate-50 dark:bg-gray-800 p-8 rounded-2xl relative"
                        >
                            <Quote className="w-10 h-10 text-blue-100 dark:text-blue-900 absolute top-6 left-6 -z-0" />
                            <div className="relative z-10">
                                <div className="flex gap-1 text-amber-400 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 italic mb-6">
                                    "{item.quote}"
                                </p>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100 dark:border-gray-800 pt-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-slate-600 dark:text-slate-400 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
