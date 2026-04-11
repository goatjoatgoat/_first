import styles from './CategoryFilter.module.css'
import { categories } from '../data/courses'

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.btn} ${selected === cat ? styles.active : ''}`}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
