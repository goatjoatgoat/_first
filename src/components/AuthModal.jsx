import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './AuthModal.module.css'

export default function AuthModal({ onClose }) {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: authError } = tab === 'login'
        ? await signIn(email, password)
        : await signUp(email, password)
      if (authError) {
        setError(authError.message)
      } else if (tab === 'signup') {
        setSuccess(true)
      } else {
        onClose()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <div className={styles.logo}><span>&lt;C&gt;</span> C Learn</div>

        {success ? (
          <div className={styles.successMsg}>
            <p>이메일을 확인하세요!</p>
            <p>확인 링크가 {email}(으)로 전송되었습니다.</p>
            <button onClick={onClose} className={styles.submitBtn}>닫기</button>
          </div>
        ) : (
          <>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${tab === 'login' ? styles.activeTab : ''}`} onClick={() => setTab('login')}>로그인</button>
              <button className={`${styles.tab} ${tab === 'signup' ? styles.activeTab : ''}`} onClick={() => setTab('signup')}>회원가입</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label>이메일</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required />
              </div>
              <div className={styles.field}>
                <label>비밀번호</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6자 이상" minLength={6} required />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? '처리 중...' : tab === 'login' ? '로그인' : '회원가입'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
