import { useState, useEffect } from 'react'
import { fetchProblems, fetchProblem } from '../api'
import styles from './ProblemsPage.module.css'

const DIFFICULTIES = ['전체', '쉬움', '보통', '어려움']

const diffColor = { 쉬움: '#3fb950', 보통: '#e3b341', 어려움: '#f78166' }

export default function ProblemsPage() {
  const [problems, setProblems] = useState([])
  const [selected, setSelected] = useState(null)
  const [activeDiff, setActiveDiff] = useState('전체')
  const [code, setCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchProblems(activeDiff).then(({ data }) => {
      setProblems(data)
      setLoading(false)
    })
  }, [activeDiff])

  const selectProblem = async (id) => {
    setDetailLoading(true)
    setShowSolution(false)
    const { data } = await fetchProblem(id)
    setSelected(data)
    setCode(data.template_code)
    setDetailLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>코딩 문제</h1>
        <div className={styles.filters}>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              className={`${styles.filterBtn} ${activeDiff === d ? styles.active : ''}`}
              onClick={() => setActiveDiff(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.list}>
          {loading ? (
            <div className={styles.listEmpty}>불러오는 중...</div>
          ) : problems.length === 0 ? (
            <div className={styles.listEmpty}>문제가 없습니다.</div>
          ) : (
            problems.map((p, idx) => (
              <div
                key={p.id}
                className={`${styles.problemItem} ${selected?.id === p.id ? styles.activeItem : ''}`}
                onClick={() => selectProblem(p.id)}
              >
                <span className={styles.problemNum}>{idx + 1}</span>
                <div className={styles.problemInfo}>
                  <span className={styles.problemTitle}>{p.title}</span>
                  <div className={styles.problemTags}>
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className={styles.tag}>#{t}</span>
                    ))}
                  </div>
                </div>
                <span className={styles.diffBadge} style={{ color: diffColor[p.difficulty] }}>
                  {p.difficulty}
                </span>
              </div>
            ))
          )}
        </div>

        {detailLoading ? (
          <div className={styles.empty}>불러오는 중...</div>
        ) : selected ? (
          <div className={styles.editor}>
            <div className={styles.editorTop}>
              <div>
                <h2>{selected.title}</h2>
                <span className={styles.diffBadge} style={{ color: diffColor[selected.difficulty] }}>
                  {selected.difficulty}
                </span>
              </div>
            </div>

            <p className={styles.description}>{selected.description}</p>

            <div className={styles.editorLabel}>코드 편집기</div>
            <textarea
              className={styles.codeArea}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />

            <div className={styles.editorActions}>
              <button
                className={styles.solutionBtn}
                onClick={() => setShowSolution((v) => !v)}
              >
                {showSolution ? '정답 숨기기' : '정답 보기'}
              </button>
            </div>

            {showSolution && (
              <div className={styles.solution}>
                <div className={styles.editorLabel}>정답 코드</div>
                <pre className={styles.solutionCode}>{selected.solution}</pre>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.empty}>← 왼쪽에서 문제를 선택하세요</div>
        )}
      </div>
    </div>
  )
}
