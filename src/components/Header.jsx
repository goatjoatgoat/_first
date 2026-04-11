import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>{'</>'}</span>
          <span className={styles.logoText}>C Learn</span>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>강의</a>
          <a href="#" className={styles.navLink}>로드맵</a>
          <a href="#" className={styles.navLink}>커뮤니티</a>
          <a href="#" className={styles.navLink}>튜토리얼</a>
        </nav>

        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="C언어 강의, 강사명 검색"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <button className={styles.searchBtn} aria-label="검색">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnOutline}>로그인</button>
          <button className={styles.btnFill}>회원가입</button>
        </div>
      </div>
    </header>
  )
}
