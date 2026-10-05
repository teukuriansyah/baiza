import axios from "axios"
import "dotenv/config"

const api = axios.create({
  baseURL:""
})

export async function getData() {
  const { data } = await api.get("/menu")
  return data
}

export async function getDataByCategory(category:string) {
  const { data } = await api.get("/menu")
  if(category === "") {
    return data
  }
  else {
    return data.data.menuItems.filter((d,i) => d.category === category ? d : null) 
  }
}

export async function getDataBySearch(search:any) {
  const { data } = await api.get("/menu")
  return data.data.menuItems.filter((item:any) => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })
}

export async function getCategory() {
  const { data } = await api.get("/menu")
  return data.data.categories.map((d:any,i:number) => {
    return {
      name:`${d.icon} ${d.name}`,
      category:d.name
    }
  })
}

export async function getDataById(id:any) {
  const { data } = await api.get("/menu/" + id)
  return data
}
