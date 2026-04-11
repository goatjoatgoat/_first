import { useState, useEffect } from 'react'
import styles from './CourseGrid.module.css'
import CourseCard from './CourseCard'
import { fetchCourses } from '../api'

export default function CourseGrid({ selectedCategory, onSelectCourse }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchCourses(selectedCategory)
      .then(({ data }) => {
        setCourses(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [selectedCategory])

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {selectedCategory === '전체' ? '전체 강의' : `${selectedCategory} 강의`}
            <span className={styles.count}>{courses.length}</span>
          </h2>
        </div>

        {loading ? (
          <div className={styles.empty}>불러오는 중...</div>
        ) : error ? (
          <div className={styles.empty}>{error}</div>
        ) : courses.length === 0 ? (
          <div className={styles.empty}>해당 카테고리의 강의가 없습니다.</div>
        ) : (
          <div className={styles.grid}>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onSelectCourse({ id: course.id, title: course.title })}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
