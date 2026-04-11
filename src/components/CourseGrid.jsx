import styles from './CourseGrid.module.css'
import CourseCard from './CourseCard'
import { courses } from '../data/courses'

export default function CourseGrid({ selectedCategory }) {
  const filtered = selectedCategory === '전체'
    ? courses
    : selectedCategory === '무료'
    ? courses.filter((c) => c.price === 0)
    : courses.filter((c) => c.level === selectedCategory)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {selectedCategory === '전체' ? '전체 강의' : `${selectedCategory} 강의`}
            <span className={styles.count}>{filtered.length}</span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>해당 카테고리의 강의가 없습니다.</div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
