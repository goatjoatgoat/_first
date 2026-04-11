const express = require('express')
const router = express.Router()
const supabase = require('../lib/supabase')

// GET /api/courses?level=중급&free=true
router.get('/', async (req, res) => {
  const { level, free } = req.query
  let query = supabase.from('courses').select('*').order('id')

  if (level && level !== '전체') {
    if (level === '무료') {
      query = query.eq('price', 0)
    } else {
      query = query.eq('level', level)
    }
  }
  if (free === 'true') query = query.eq('price', 0)

  const { data, error } = await query
  if (error) return res.status(500).json({ message: error.message })
  res.json({ data, total: data.length })
})

// GET /api/courses/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', Number(req.params.id))
    .single()
  if (error) return res.status(404).json({ message: '강의를 찾을 수 없습니다.' })
  res.json({ data })
})

module.exports = router
