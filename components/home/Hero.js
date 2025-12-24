"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Star } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-gray-900">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue-50/50 to-transparent dark:from-blue-900/10" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl dark:bg-blue-500/10" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl dark:bg-teal-500/10" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium mb-6">
                        #1 Trusted Caregiving Platform
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                        Care with Dignity, <br />
                        <span className="text-blue-600 dark:text-blue-400">Peace of Mind</span> at Home.
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Find verified professionals for babysitting, elderly support, and specialized care.
                        Compassionate service when you need it most.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                        <Link href="#services" passHref>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-lg hover:bg-slate-50 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-slate-200 dark:hover:bg-gray-750"
                            >
                                Explore Services
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Stats or Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-16 flex flex-wrap justify-center gap-8 text-slate-500 dark:text-slate-400"
                >
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-teal-500" />
                        <span className="font-medium">Verified Caregivers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-500" />
                        <span className="font-medium">Compassionate Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        <span className="font-medium">4.9/5 Customer Rating</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
