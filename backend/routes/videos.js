const express = require('express')
const router = express.Router()
const supabase = require('../lib/supabase')

// GET /api/videos?courseId=1
router.get('/', async (req, res) => {
  const { courseId } = req.query
  let query = supabase.from('videos').select('*').order('order_index')
  if (courseId) query = query.eq('course_id', Number(courseId))
  const { data, error } = await query
  if (error) return res.status(500).json({ message: error.message })
  res.json({ data, total: data.length })
})

// GET /api/videos/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', req.params.id)
    .single()
  if (error) return res.status(404).json({ message: '영상을 찾을 수 없습니다.' })
  res.json({ data })
})

module.exports = router
