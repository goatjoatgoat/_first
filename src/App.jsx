import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Banner from './components/Banner'
import CategoryFilter from './components/CategoryFilter'
import CourseGrid from './components/CourseGrid'
import AuthModal from './components/AuthModal'
import AccountModal from './components/AccountModal'
import VideoPage from './pages/VideoPage'
import ProblemsPage from './pages/ProblemsPage'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [page, setPage] = useState('home')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)

  const goHome = () => setPage('home')
  const goProblems = () => setPage('problems')
  const goVideo = (course) => {
    setSelectedCourse(course)
    setPage('video')
  }

  return (
    <AuthProvider>
      <Header
        page={page}
        onGoHome={goHome}
        onGoProblems={goProblems}
        onShowAuth={() => setShowAuthModal(true)}
        onShowAccount={() => setShowAccountModal(true)}
      />

      {page === 'home' && (
        <>
          <Banner />
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <CourseGrid selectedCategory={selectedCategory} onSelectCourse={goVideo} />
        </>
      )}

      {page === 'video' && selectedCourse && (
        <VideoPage
          courseId={selectedCourse.id}
          courseName={selectedCourse.title}
          onBack={goHome}
        />
      )}

      {page === 'problems' && <ProblemsPage />}

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showAccountModal && <AccountModal onClose={() => setShowAccountModal(false)} />}
    </AuthProvider>
  )
}
