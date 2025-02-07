const express = require("express")
const { google } = require("googleapis")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Mock database (replace with a real database in production)
const moods = []
const journalEntries = []
const reminders = []

const tips = [
  "Take a deep breath and focus on the present moment.",
  "Practice gratitude by listing three things you're thankful for.",
  "Take a short walk and observe nature around you.",
  "Do a quick body scan meditation to release tension.",
  "Write down your thoughts and feelings for a few minutes.",
]

// Google Calendar API setup
const calendar = google.calendar({ version: "v3", auth: process.env.GOOGLE_API_KEY })

app.get("/api/mood", (req, res) => {
  res.json(moods)
})

app.post("/api/mood", (req, res) => {
  const { mood, date } = req.body
  moods.push({ mood, date })
  res.status(201).json({ message: "Mood logged successfully" })
})

app.get("/api/journal", (req, res) => {
  res.json(journalEntries)
})

app.post("/api/journal", (req, res) => {
  const { content, date } = req.body
  journalEntries.push({ content, date })
  res.status(201).json({ message: "Journal entry saved successfully" })
})

app.get("/api/tips", (req, res) => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)]
  res.json({ tip: randomTip })
})

app.get("/api/reminders", (req, res) => {
  res.json(reminders)
})

app.post("/api/reminders", async (req, res) => {
  const { text, date } = req.body
  reminders.push({ text, date })

  try {
    const event = {
      summary: text,
      start: {
        dateTime: new Date(date).toISOString(),
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: new Date(new Date(date).getTime() + 30 * 60000).toISOString(),
        timeZone: "America/Los_Angeles",
      },
    }

    await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    })

    res.status(201).json({ message: "Reminder created and added to Google Calendar" })
  } catch (error) {
    console.error("Error creating Google Calendar event:", error)
    res.status(500).json({ message: "Error creating reminder" })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

