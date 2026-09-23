const API_URL = 'http://192.168.0.181:80'
export async function login(username, password){
    const response = await fetch(
        `${API_URL}/building/auth/user/client/login`,
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

