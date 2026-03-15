// This entire folder would be used for backend code.
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', project: 'Synvex Backend' })
})

app.listen(5000, () => console.log('Backend running on port 5000'))