import { useState, useEffect } from 'react'
import { bannerSlides } from '../data/courses'
import styles from './Banner.module.css'

export default function Banner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % bannerSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const slide = bannerSlides[current]

  return (
    <section className={styles.banner} style={{ background: slide.bgColor }}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.badge} style={{ background: slide.accentColor }}>
            {slide.badge}
          </span>
          <h1 className={styles.title}>{slide.title}</h1>
          <p className={styles.subtitle}>
            {slide.subtitle.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
          <button className={styles.cta} style={{ background: slide.accentColor }}>
            지금 시작하기 →
          </button>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
            <span className={styles.fileName}>main.c</span>
          </div>
          <pre className={styles.code}>{`#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");

    // 포인터 예제
    int num = 42;
    int *ptr = &num;

    printf("값: %d\\n", *ptr);
    printf("주소: %p\\n", ptr);

    return 0;
}`}</pre>
        </div>
      </div>

      <div className={styles.controls}>
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            className={i === current ? `${styles.dot2} ${styles.active}` : styles.dot2}
            onClick={() => setCurrent(i)}
            aria-label={`슬라이드 ${i + 1}`}
          />
        ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => setCurrent(prev => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
        aria-label="이전"
      >&#8249;</button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => setCurrent(prev => (prev + 1) % bannerSlides.length)}
        aria-label="다음"
      >&#8250;</button>
    </section>
  )
}
