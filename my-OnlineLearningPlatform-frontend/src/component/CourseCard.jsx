import { Link } from "react-router-dom"

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={course.thumbnail || "/placeholder.svg?height=200&width=400"}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{course.category}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-gray-600">
              {course.rating} ({course.reviewCount})
            </span>
          </div>
          <span className="text-lg font-bold text-gray-900">${course.price.toFixed(2)}</span>
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          View Course
        </Link>
      </div>
    </div>
  )
}

export default CourseCard
