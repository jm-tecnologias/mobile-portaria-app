const API_URL = 'http://127.0.0.1:8000'
export const fetchDashboard = async (token) => {
    const response = await fetch(
        `${API_URL}/client/member/dashboard/get/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    }
    );
    if (!response.ok) {
        throw new Error(`Erro: HTTP ${response.status}`)

    }
    const data = await response.json();
    return data
}


// Tatamento para PROMISE

// console.log('Da: ', 
//     fetchDashboard('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidHlwZSI6ImFjY2VzcyIsImV4cCI6MTc5MDc3MTQ2NiwiaWF0IjoxNzkwNzY5NjY2fQ.OUF5CilHd1s3gVzu2tjt7W8k6uaZKLzMkwlWBLmJV4Y')
//     .then(value => console.log(value))
// )
