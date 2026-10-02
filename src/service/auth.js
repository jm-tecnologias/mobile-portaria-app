const API_URL = 'http://127.0.0.1:8000'
export async function login(username, password){
    const response = await fetch(
        `${API_URL}/client/auth/user/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username,
                password
            }),
        }
    )
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.detail || "Erro ao iniciar Sessão");
    }
    return data
}

