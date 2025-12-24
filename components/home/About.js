"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const benefits = [
    {
        title: "Verified Caregivers",
        description: "Every caregiver undergoes a strict background check and skills assessment."
    },
    {
        title: "Flexible Booking",
        description: "Book for a few hours or full-time. We work around your schedule."
    },
    {
        title: "Transparent Pricing",
        description: "No hidden fees. See the total cost upfront before you confirm."
    }
];

export default function About() {
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                            Our Mission is to Make Caregiving <span className="text-teal-600">Safe & Simple</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            At Care.xyz, we believe everyone deserves high-quality care at home.
                            We bridge the gap between families in need and professional caregivers who treat your loved ones like their own.
                            Our platform is built on trust, transparency, and a deep respect for human dignity.
                        </p>

                        <div className="space-y-6">
                            {benefits.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle className="w-6 h-6 text-teal-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Placeholder for an image - using a stylized div for now */}
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-gray-800 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-gray-600">
                                <img src="oldpeople.png" alt="oldpeople" />
                            </div>
                            {/* Decorative blob */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 dark:bg-blue-900/30"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 dark:bg-teal-900/30"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
