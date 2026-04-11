const express = require('express')
const router = express.Router()
const supabase = require('../lib/supabase')

// GET /api/problems?difficulty=쉬움
router.get('/', async (req, res) => {
  const { difficulty } = req.query
  let query = supabase
    .from('problems')
    .select('id, title, difficulty, tags, created_at')
    .order('created_at')
  if (difficulty && difficulty !== '전체') {
    query = query.eq('difficulty', difficulty)
  }
  const { data, error } = await query
  if (error) return res.status(500).json({ message: error.message })
  res.json({ data, total: data.length })
})

// GET /api/problems/:id — template_code, solution 포함
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .eq('id', req.params.id)
    .single()
  if (error) return res.status(404).json({ message: '문제를 찾을 수 없습니다.' })
  res.json({ data })
})

module.exports = router
