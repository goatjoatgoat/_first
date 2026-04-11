const BASE = '/api'

export async function fetchCourses(level) {
  let url = `${BASE}/courses`
  if (level && level !== '전체') {
    url += level === '무료' ? '?free=true' : `?level=${encodeURIComponent(level)}`
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error('강의 목록을 불러오지 못했습니다.')
  return res.json()
}

export async function fetchVideos(courseId) {
  const res = await fetch(`${BASE}/videos?courseId=${courseId}`)
  if (!res.ok) throw new Error('영상 목록을 불러오지 못했습니다.')
  return res.json()
}

export async function fetchProblems(difficulty) {
  let url = `${BASE}/problems`
  if (difficulty && difficulty !== '전체') {
    url += `?difficulty=${encodeURIComponent(difficulty)}`
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error('문제 목록을 불러오지 못했습니다.')
  return res.json()
}

export async function fetchProblem(id) {
  const res = await fetch(`${BASE}/problems/${id}`)
  if (!res.ok) throw new Error('문제를 불러오지 못했습니다.')
  return res.json()
}
