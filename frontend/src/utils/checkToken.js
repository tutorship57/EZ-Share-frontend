
// helper function: ตรวจว่ามี token ใช้ได้หรือไม่ ถ้าไม่ก็ refresh
import { fetchAccessToken } from "../functions/accessTokenFetch"

export const ensureToken = async (accessToken,setAccessToken) => {

    try {
      const res = await fetchAccessToken()
      if (res?.data?.accessToken) {
        setAccessToken(res.data.accessToken)
        return res.data.accessToken
      }
    } catch (err) {
      console.error('Failed to recover token', err)
    }
    return null
}