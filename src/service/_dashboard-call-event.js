const API_URL = 'http://127.0.0.1:8000'
export const fetchDashboard = async (token) => {
    const response = await fetch(
        `http://127.0.0.1:8000/building/auth/client/dashboard/get/${1}`
    );
    if (!response.ok) {
        const errorData = await response
            .json()
            .catch(() => null);
        throw new Error(
            errorData?.detail ||
            `Erro HTTP ${response.status}`
        );
    }
    const data = await response.json();
    console.log('DASHBOARD DATA:', data);

    return data
}