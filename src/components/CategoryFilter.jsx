import styles from './CategoryFilter.module.css'
import { categories } from '../data/courses'

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={cat.id === selected ? `${styles.btn} ${styles.active}` : styles.btn}
            onClick={() => onSelect(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}
