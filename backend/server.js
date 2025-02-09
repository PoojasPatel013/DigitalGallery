const express = require("express")
const cors = require("cors")
const fs = require("fs").promises
const path = require("path")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Helper function to read JSON files
async function readJsonFile(filename) {
  const filePath = path.join(__dirname, "data", filename)
  const data = await fs.readFile(filePath, "utf8")
  return JSON.parse(data)
}

// Routes
app.get("/api/artworks", async (req, res) => {
  try {
    const artworks = await readJsonFile("artworks.json")
    res.json(artworks)
  } catch (error) {
    res.status(500).json({ message: "Error fetching artworks", error: error.message })
  }
})

app.get("/api/artists", async (req, res) => {
  try {
    const artists = await readJsonFile("artists.json")
    res.json(artists)
  } catch (error) {
    res.status(500).json({ message: "Error fetching artists", error: error.message })
  }
})

app.get("/api/exhibitions", async (req, res) => {
  try {
    const exhibitions = await readJsonFile("exhibitions.json")
    res.json(exhibitions)
  } catch (error) {
    res.status(500).json({ message: "Error fetching exhibitions", error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

