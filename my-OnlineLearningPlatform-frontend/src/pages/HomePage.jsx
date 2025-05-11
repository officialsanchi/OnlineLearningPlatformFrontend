import { Link } from "react-router-dom"
import CourseCard from "../component/CourseCard"
// import { featuredCourses } from "../data/courses"

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Learn Without Limits</h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Start, switch, or advance your career with thousands of courses from expert instructors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/courses"
                className="px-6 py-3 rounded-md bg-white text-blue-600 font-medium hover:bg-gray-100 transition-colors"
              >
                Explore Courses
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-md bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors"
              >
                Join For Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Courses</h2>
            <Link to="/courses" className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Browse Top Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/courses?category=${category.slug}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 text-3xl mb-3">{category.icon}</div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">How LearnHub Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Find the Right Course</h3>
              <p className="text-gray-600">Choose from thousands of courses taught by real-world experts.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn at Your Own Pace</h3>
              <p className="text-gray-600">Access courses on any device, anytime, and learn at your own schedule.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Achieve Your Goals</h3>
              <p className="text-gray-600">
                Get certified, advance your career, or learn a new skill for personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">What Our Students Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already learning on LearnHub.
          </p>
          <Link
            to="/signup"
            className="px-6 py-3 rounded-md bg-white text-blue-600 font-medium hover:bg-gray-100 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

// Sample data for the homepage
const categories = [
  { name: "Programming", slug: "programming", icon: "💻" },
  { name: "Design", slug: "design", icon: "🎨" },
  { name: "Business", slug: "business", icon: "📊" },
  { name: "Marketing", slug: "marketing", icon: "📱" },
  { name: "Photography", slug: "photography", icon: "📷" },
  { name: "Music", slug: "music", icon: "🎵" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Web Developer",
    text: "The programming courses on LearnHub helped me transition from a marketing role to a full-time web developer position in just 6 months.",
  },
  {
    name: "Michael Chen",
    role: "Graphic Designer",
    text: "I've taken multiple design courses here and the quality of instruction is consistently excellent. The projects are practical and helped build my portfolio.",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    text: "LearnHub's digital marketing courses were instrumental in helping me stay current with the latest trends and strategies in the industry.",
  },
]

export default HomePage
