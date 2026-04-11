import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>&lt;C&gt;</span>
          <span className={styles.logoText}>C Learn</span>
        </div>

        <nav className={styles.nav}>
          <a href="#">강의</a>
          <a href="#">로드맵</a>
          <a href="#">커뮤니티</a>
        </nav>

        <div className={styles.searchBox}>
          <input type="text" placeholder="배우고 싶은 C언어 주제를 검색해보세요" />
          <button className={styles.searchBtn}>🔍</button>
        </div>

        <div className={styles.authButtons}>
          <button className={styles.loginBtn}>로그인</button>
          <button className={styles.signupBtn}>회원가입</button>
        </div>
      </div>
    </header>
  )
}
