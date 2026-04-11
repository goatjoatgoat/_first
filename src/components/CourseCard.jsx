import styles from './CourseCard.module.css'

export default function CourseCard({ course }) {
  const { title, instructor, price, rating, reviewCount, level, tags } = course

  const levelColor = {
    입문: '#3fb950',
    중급: '#58a6ff',
    고급: '#f78166',
    실전: '#ffa657',
    무료: '#bc8cff',
  }

  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <div className={styles.thumbnailPlaceholder}>
          <span className={styles.codeSnippet}>{'<C/>'}</span>
        </div>
        <span
          className={styles.levelBadge}
          style={{ color: levelColor[level] || '#8b949e', borderColor: levelColor[level] || '#8b949e' }}
        >
          {level}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.instructor}>{instructor}</p>

        <div className={styles.tags}>
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span className={styles.ratingNum}>{rating}</span>
            <span className={styles.reviewCount}>({reviewCount.toLocaleString()})</span>
          </div>
          <span className={styles.price}>
            {price === 0 ? '무료' : `₩${price.toLocaleString()}`}
          </span>
        </div>
      </div>
    </div>
  )
}
