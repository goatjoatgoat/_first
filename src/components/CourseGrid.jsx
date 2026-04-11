import { useState } from 'react'
import { courses } from '../data/courses'
import CourseCard from './CourseCard'
import CategoryFilter from './CategoryFilter'
import styles from './CourseGrid.module.css'

const sortOptions = [
  { value: 'popular', label: '인기순' },
  { value: 'newest', label: '최신순' },
  { value: 'rating', label: '평점순' },
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
]

export default function CourseGrid() {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')

  const filtered = courses
    .filter(c => category === 'all' || c.category === category)
    .slice()
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'price_asc') return a.price - b.price
      if (sort === 'price_desc') return b.price - a.price
      if (sort === 'newest') return b.id - a.id
      return b.reviewCount - a.reviewCount
    })

  return (
    <section>
      <CategoryFilter selected={category} onSelect={setCategory} />

      <div className={styles.container}>
        <div className={styles.toolbar}>
          <span className={styles.count}>
            총 <strong>{filtered.length}</strong>개의 강의
          </span>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📚</span>
            <p>해당 카테고리의 강의가 없습니다.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
