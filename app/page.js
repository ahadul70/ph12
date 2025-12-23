
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Care you can Trust
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-100">
            Professional babysitting, elderly care, and specialized support for your loved ones at home.
          </p>
          <a href="#services" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
            Find Care Now
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              At Care.xyz, our mission is to make caregiving easy, secure, and accessible for everyone. We connect families with verified caretakers to ensure your loved ones receive the best possible care in the comfort of their homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-gray-600 dark:text-gray-400">Every caretaker is vetted and verified for your peace of mind.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-xl font-semibold mb-2">Flexible Booking</h3>
              <p className="text-gray-600 dark:text-gray-400">Book for hours, days, or months based on your specific needs.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Local Service</h3>
              <p className="text-gray-600 dark:text-gray-400">Find care providers in your area quickly and easily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Choose the perfect care plan for your family</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Mock) */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What Families Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">"Care.xyz was a lifesaver when I needed a last-minute babysitter. The booking process was seamless!"</p>
              <p className="font-semibold text-gray-900 dark:text-white">- Sarah J.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">"Finding reliable elderly care for my father was difficult until I found this platform. Highly recommended."</p>
              <p className="font-semibold text-gray-900 dark:text-white">- Michael R.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
