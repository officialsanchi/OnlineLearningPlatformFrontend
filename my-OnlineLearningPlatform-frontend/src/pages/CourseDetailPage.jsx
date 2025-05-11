"use client"

import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { allCourses } from "../data/course"

function CourseDetailPage() {
  const { courseId } = useParams()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")

  // Find the course with the matching id
  const course = allCourses.find((c) => c.id === courseId)

  // If course not found
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/courses"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Browse Courses
        </Link>
      </div>
    )
  }

  // Check if user is enrolled
  const isEnrolled = currentUser && currentUser.enrolledCourses && currentUser.enrolledCourses.includes(course.id)

  // Handle enrollment
  const handleEnroll = () => {
    if (!currentUser) {
      navigate("/login")
      return
    }

    // In a real app, this would make an API call to enroll the user
    // For demo purposes, we'll just redirect to the learning dashboard
    navigate(`/dashboard`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="mb-4">{course.description}</p>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1">
                  {course.rating} ({course.reviewCount} reviews)
                </span>
              </div>
              <div className="mr-4">
                <span>{course.students} students</span>
              </div>
              <div>
                <span>Last updated {course.lastUpdated}</span>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <img
                src={course.instructorAvatar || "/placeholder.svg?height=50&width=50"}
                alt={course.instructor}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span>
                Created by <strong>{course.instructor}</strong>
              </span>
            </div>

            {isEnrolled ? (
              <Link
                to={`/learn/${course.id}/${course.modules[0].lessons[0].id}`}
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Continue Learning
              </Link>
            ) : (
              <button
                onClick={handleEnroll}
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Enroll Now - ${course.price.toFixed(2)}
              </button>
            )}
          </div>

          <div className="relative">
            <img
              src={course.thumbnail || "/placeholder.svg?height=300&width=500"}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 rounded-full p-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("curriculum")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "curriculum"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-4">Course Description</h2>
                <div className="prose max-w-none mb-6">
                  <p>{course.fullDescription}</p>
                </div>

                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 mb-6">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="mb-1">
                      {req}
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-4">Who this course is for</h2>
                <ul className="list-disc pl-5">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index} className="mb-1">
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                <div className="text-sm text-gray-500 mb-4">
                  {course.modules.length} modules • {course.totalLessons} lessons • {course.totalDuration} total length
                </div>

                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                        <h3 className="font-medium">
                          Module {index + 1}: {module.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {module.lessons.length} lessons • {module.duration}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 text-gray-400 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                              </svg>
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="text-5xl font-bold text-gray-900">{course.rating}</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${star <= Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{course.reviewCount} reviews</div>
                  </div>

                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const percentage = Math.round((course.ratingDistribution[rating] / course.reviewCount) * 100)
                      return (
                        <div key={rating} className="flex items-center mb-1">
                          <div className="flex items-center mr-2">
                            <span className="text-sm text-gray-600 mr-1">{rating}</span>
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{percentage}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  {course.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start">
                        <img
                          src={review.avatar || "/placeholder.svg?height=40&width=40"}
                          alt={review.name}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="flex items-center mb-2">
                            <div className="flex mr-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold mb-2">${course.price.toFixed(2)}</div>
              {course.originalPrice && (
                <div className="text-gray-500 line-through">${course.originalPrice.toFixed(2)}</div>
              )}
              {course.discount && <div className="text-green-600 font-medium">{course.discount}% off</div>}
            </div>

            {isEnrolled ? (
              <Link
                to={`/learn/${course.id}/${course.modules[0].lessons[0].id}`}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-medium hover:bg-blue-700 transition-colors mb-4"
              >
                Continue Learning
              </Link>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors mb-4"
              >
                Enroll Now
              </button>
            )}

            <div className="text-center text-sm text-gray-500 mb-6">30-Day Money-Back Guarantee</div>

            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{course.totalDuration} of video content</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span>{course.totalLessons} lessons</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Downloadable resources</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Certificate of completion</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Lifetime access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
