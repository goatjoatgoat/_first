import { useState, useEffect } from 'react'
import { fetchVideos } from '../api'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import styles from './VideoPage.module.css'

export default function VideoPage({ courseId, courseName, onBack }) {
  const [videos, setVideos] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(new Set())
  const { user } = useAuth()

  useEffect(() => {
    fetchVideos(courseId).then(({ data }) => {
      setVideos(data)
      setSelected(data[0] ?? null)
      setLoading(false)
    })
  }, [courseId])

  useEffect(() => {
    if (!user) return
    supabase
      .from('user_progress')
      .select('video_id')
      .eq('user_id', user.id)
      .eq('completed', true)
      .then(({ data }) => {
        if (data) setCompleted(new Set(data.map((r) => r.video_id)))
      })
  }, [user])

  const markCompleted = async () => {
    if (!user || !selected) return
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      video_id: selected.id,
      completed: true,
    })
    setCompleted((prev) => new Set([...prev, selected.id]))
  }

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  if (loading) return <div className={styles.loading}>불러오는 중...</div>

  if (videos.length === 0) {
    return (
      <div className={styles.loading}>
        <button onClick={onBack} className={styles.backBtn}>← 강의 목록으로</button>
        <p style={{ marginTop: 16 }}>등록된 영상이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button onClick={onBack} className={styles.backBtn}>← 강의 목록으로</button>
        <span className={styles.courseName}>{courseName}</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.player}>
          {selected && (
            <>
              <video
                key={selected.id}
                src={selected.video_url}
                controls
                className={styles.video}
              />
              <div className={styles.videoInfo}>
                <h2 className={styles.videoTitle}>{selected.title}</h2>
                {selected.description && (
                  <p className={styles.videoDesc}>{selected.description}</p>
                )}
                {user ? (
                  <button
                    className={`${styles.completeBtn} ${completed.has(selected.id) ? styles.completed : ''}`}
                    onClick={markCompleted}
                    disabled={completed.has(selected.id)}
                  >
                    {completed.has(selected.id) ? '✓ 완료됨' : '완료 표시'}
                  </button>
                ) : (
                  <p className={styles.loginHint}>로그인하면 수강 진도를 기록할 수 있습니다.</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>강의 목록 ({videos.length})</h3>
          <ul className={styles.videoList}>
            {videos.map((v, idx) => (
              <li
                key={v.id}
                className={`${styles.videoItem} ${selected?.id === v.id ? styles.active : ''}`}
                onClick={() => setSelected(v)}
              >
                <span className={styles.videoIndex}>{idx + 1}</span>
                <div className={styles.videoMeta}>
                  <span className={styles.videoItemTitle}>{v.title}</span>
                  <span className={styles.duration}>{formatDuration(v.duration)}</span>
                </div>
                {completed.has(v.id) && <span className={styles.checkmark}>✓</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
