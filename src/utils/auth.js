// import jwtDecode from "jwt-decode"
import { jwtDecode } from "jwt-decode"

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("authToken")
  return !!token
}

// export const setAuthToken = (token, user = null) => {
//   if (typeof window === "undefined") return
//   localStorage.setItem("authToken", token)
//   if (user) {
//     localStorage.setItem("user", JSON.stringify(user))
//   } else {
//     localStorage.removeItem("user") // avoid invalid string
//   }
//   localStorage.setItem("loginTimestamp", Date.now().toString())
// }



export const setAuthToken = (token) => {
  if (typeof window === "undefined") return

  localStorage.setItem("authToken", token)

  try {
    const decoded = jwtDecode(token)

    const userData = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      district: decoded.district,
      taluka: decoded.taluka
    }

    localStorage.setItem("user", JSON.stringify(userData))
  } catch (err) {
    console.error("Token decode failed", err)
  }

  localStorage.setItem("loginTimestamp", Date.now().toString())
}

export const removeAuthToken = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("authToken")
  localStorage.removeItem("user")
  localStorage.removeItem("loginTimestamp")
}


export const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

export const getUser = () => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("user")
  if (!user || user === "undefined") return null

  try {
    return JSON.parse(user)
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err)
    return null
  }
}
