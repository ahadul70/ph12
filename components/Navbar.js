
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">Care.xyz</span>
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 px-3 py-2 rounded-md font-medium">
                            Home
                        </Link>
                        <Link href="/#services" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 px-3 py-2 rounded-md font-medium">
                            Services
                        </Link>

                        {session ? (
                            <>
                                <Link href="/my-bookings" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 px-3 py-2 rounded-md font-medium">
                                    My Bookings
                                </Link>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">Hi, {session.user.name}</span>
                                    <button
                                        onClick={() => signOut()}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex space-x-4">
                                <Link href="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 px-3 py-2 rounded-md font-medium">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
                            Home
                        </Link>
                        <Link href="/#services" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
                            Services
                        </Link>
                        {session ? (
                            <>
                                <Link href="/my-bookings" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
                                    My Bookings
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-gray-50 hover:border-red-300"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
                                    Login
                                </Link>
                                <Link href="/register" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-600 hover:bg-gray-50 hover:border-blue-300">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
