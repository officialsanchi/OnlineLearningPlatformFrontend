import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <LearningDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/learn/:courseId/:lessonId"
                element={
                  <PrivateRoute>
                    <LessonPage />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
