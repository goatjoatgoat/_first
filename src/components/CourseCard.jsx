import styles from './CourseCard.module.css'

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  )
}

export default function CourseCard({ course }) {
  const discount = Math.round((1 - course.price / course.originalPrice) * 100)

  return (
    <div className={styles.card}>
      <div className={styles.thumbnail} style={{ background: course.color }}>
        {course.badge && (
          <span className={`${styles.badge} ${styles[`badge_${course.badge.toLowerCase()}`]}`}>
            {course.badge}
          </span>
        )}
        <div className={styles.thumbContent}>
          <span className={styles.thumbCode}>{'{ C }'}</span>
          <span className={styles.thumbLevel}>{course.level}</span>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.instructor}>{course.instructor}</p>

        <div className={styles.rating}>
          <StarIcon />
          <span className={styles.ratingNum}>{course.rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>({course.reviewCount.toLocaleString()})</span>
          <span className={styles.dot}>·</span>
          <span className={styles.studentCount}>수강생 {course.studentCount}</span>
        </div>

        <div className={styles.tags}>
          {course.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.priceRow}>
          <span className={styles.price}>₩{course.price.toLocaleString()}</span>
          <span className={styles.original}>₩{course.originalPrice.toLocaleString()}</span>
          <span className={styles.discount}>{discount}% 할인</span>
        </div>
      </div>
    </div>
  )
}
