const API_URL = 'http://127.0.0.1:8000'

export async function createInvite(params) {
    const response = await fetch(
          `${API_URL}/client/member/visitor/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            member_id: params.member_id,
            name: params.name,
            phone: params.phone,
            visitor_date: params.visitor_date,
            visitor_time: params.visitor_time,
            description: params.description
          }),
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.detail || "Erro de persistencia de dados")
        }
    return data
}