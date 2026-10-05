import axios from "axios"
// import "dotenv/config"

const api = axios.create({
  baseURL:""
})

export async function getDataUser() {
  const { data } = await api.get("/user")
  return data
}
