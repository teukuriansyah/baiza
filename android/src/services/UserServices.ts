import axios from "axios"

const api = axios.create({
  baseURL:""
})

export async function getDataUser() {
  const { data } = await api.get("/user")
  return data
}

export async function getDataNotification() {
  const { data } = await api.get("/notification")
  return data
}
