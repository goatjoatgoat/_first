import { useAuth } from '../context/AuthContext'
import styles from './Header.module.css'

export default function Header({ page, onGoHome, onGoProblems, onShowAuth }) {
  const { user, signOut } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo} onClick={onGoHome}>
          <span className={styles.logoIcon}>&lt;C&gt;</span>
          <span className={styles.logoText}>C Learn</span>
        </div>

        <nav className={styles.nav}>
          <a onClick={onGoHome} className={page === 'home' ? styles.activeNav : ''}>강의</a>
          <a onClick={onGoProblems} className={page === 'problems' ? styles.activeNav : ''}>코딩 문제</a>
          <a href="#">로드맵</a>
        </nav>

        <div className={styles.searchBox}>
          <input type="text" placeholder="배우고 싶은 C언어 주제를 검색해보세요" />
          <button className={styles.searchBtn}>🔍</button>
        </div>

        <div className={styles.authButtons}>
          {user ? (
            <>
              <span className={styles.userEmail}>{user.email}</span>
              <button className={styles.loginBtn} onClick={signOut}>로그아웃</button>
            </>
          ) : (
            <>
              <button className={styles.loginBtn} onClick={onShowAuth}>로그인</button>
              <button className={styles.signupBtn} onClick={onShowAuth}>회원가입</button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
