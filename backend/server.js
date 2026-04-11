require('dotenv').config()
const express = require('express')
const cors = require('cors')

const coursesRouter = require('./routes/courses')
const videosRouter = require('./routes/videos')
const problemsRouter = require('./routes/problems')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/courses', coursesRouter)
app.use('/api/videos', videosRouter)
app.use('/api/problems', problemsRouter)

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use((req, res) => res.status(404).json({ message: '존재하지 않는 경로입니다.' }))

app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`))
