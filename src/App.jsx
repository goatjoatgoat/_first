import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import CategoryFilter from './components/CategoryFilter'
import CourseGrid from './components/CourseGrid'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  return (
    <>
      <Header />
      <Banner />
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      <CourseGrid selectedCategory={selectedCategory} />
    </>
  )
}
