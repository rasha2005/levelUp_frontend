import Image from "next/image";
import Layout from "../components/header/layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
    <main className="bg-gray-100">
     
        {/* Hero Section */}
        <section className="bg-cyan-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Reach Your Full Potential</h2>
          <p className="text-lg mb-8">
            Personalized coaching to help you achieve your goals in health, career, and life.
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-500 px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-200"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Personalized Coaching</h4>
              <p>
                Get a dedicated coach who works with you to create a plan tailored to your specific needs and goals.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Progress Tracking</h4>
              <p>
                Track your progress over time with detailed reports, ensuring you're always on track to achieve your objectives.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Expert Coaches</h4>
              <p>
                Our team of professional coaches specialize in health, fitness, career, and personal development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Start Your Journey Today</h3>
          <p className="text-lg mb-8">
            Sign up for personalized coaching and take the first step towards achieving your goals.
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-200"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 levelUp. All rights reserved.</p>
        </div>
      </footer>
    </main>
    </Layout>
  );
}
