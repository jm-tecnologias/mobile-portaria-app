const API_URL = 'http://127.0.0.1:8000'
export async function fetch_dashboard(token) {
    const response = await fetch(
        `${API_URL}/building/auth/client/dashboard/get/${token}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
                // token
            // }),
        }
    )
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.detail || 'Erro Fetching Dashboard Data!')
    }
    // console.log('DADOS: ',data)

    return data
}