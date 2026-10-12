const API_URL = 'http://127.0.0.1:8000'

export async function editProfile(token, params) {
    const response = await fetch(
          `${API_URL}/client/member/update/profile/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: params.phone,
            email:params.email,
            profile_pic_url:params.photo_url

          }),
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.detail || "Erro de persistencia de dados")
        }
    return data
}