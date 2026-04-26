import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './AccountModal.module.css'

export default function AccountModal({ onClose }) {
  const { user, updateUser } = useAuth()

  const meta = user?.user_metadata || {}

  const [userId, setUserId] = useState(meta.user_id || '')
  const [name, setName] = useState(meta.name || '')
  const [occupation, setOccupation] = useState(meta.occupation || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    if (password && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      setLoading(false)
      return
    }

    const updates = {
      data: { user_id: userId, name, occupation },
    }
    if (email !== user?.email) updates.email = email
    if (password) updates.password = password

    const { error: updateError } = await updateUser(updates)

    if (updateError) {
      setError(updateError.message)
    } else {
      setMessage('계정 정보가 업데이트되었습니다.')
      setPassword('')
      setConfirmPassword('')
    }

    setLoading(false)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>계정 정보</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>기본 정보</h3>

            <div className={styles.field}>
              <label>아이디</label>
              <input
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="사용할 아이디를 입력하세요"
              />
            </div>

            <div className={styles.field}>
              <label>이름</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
            </div>

            <div className={styles.field}>
              <label>이메일</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div className={styles.field}>
              <label>직업</label>
              <input
                type="text"
                value={occupation}
                onChange={e => setOccupation(e.target.value)}
                placeholder="직업을 입력하세요 (예: 학생, 개발자)"
              />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>보안</h3>

            <div className={styles.field}>
              <label>새 비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="변경할 비밀번호 (변경 안 할 시 비워두세요)"
              />
            </div>

            <div className={styles.field}>
              <label>비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}

          <div className={styles.actions}>
            <button className={styles.cancelBtn} onClick={onClose}>취소</button>
            <button className={styles.saveBtn} onClick={handleSave} disabled={loading}>
              {loading ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
