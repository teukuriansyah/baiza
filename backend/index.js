import express from "express"
import cors from "cors"
import ngrok from "@ngrok/ngrok"
import "dotenv/config"
import menuRoute from "./route/menuRoute.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use(menuRoute)

app.listen(3000,async() => {
  const forwarder = await ngrok.forward({
    addr:"localhost:3000",
    authtoken_from_env: true,
  })
  console.log(forwarder.url())
})