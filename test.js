// const endpoint = "http://127.0.0.1:8000/public/tables/yUkNZ0fiIpx8o_-gusn-qcSvPDinBjSy"
// fetch(endpoint).then(response => {
// console.log(response);
// })
const data =   {
  "user": {
    "username": "Client",
    "password": null,
    "description": "Test User",
    "member_id": null,
    "status": true,
    "profile_pic_url": null,
    "id": 1,
    "created_at": null,
    "updated_at": null
  },
  "member": {
    "user_id": null,
    "client_id": null,
    "apartment_id": null,
    "doc_id": "100100692835M",
    "name": "Amilcar",
    "surname": "Mula",
    "phone": "847100777",
    "email": "amilcarmhula.am@gmail.com",
    "client_relationship": null,
    "description": "Membro principal(Primeiro membro)",
    "status": true,
    "profile_pic_url": null,
    "barcode_url": "http://127.0.0.1:8000/media/barcodes/M-0000000000001.png",
    "id": 1,
    "token": null,
    "created_at": null,
    "updated_at": null,
    "visitors": [
      {
        "member_id": 1,
        "name": "Marcus sousa",
        "phone": "857478569",
        "date": "2026-09-24",
        "time": "12:45:00",
        "status": "Waitting for Check In",
        "description": "dsaf",
        "id": 2,
        "token": "eyJh_GciOiJIU.I1NiIsInR5cCI6Ikee",
        "created_at": "2026-09-24T10:22:22.123456",
        "updated_at": "2026-09-24T10:22:22.123333",
        "visitor_check_historic": []
      }
    ]
  },
  "apartment": {
    "floor": "1",
    "number": "A100",
    "type": "T4",
    "description": "Apartamento classe S, com 4 quartos Suite, duas cozinhas, 2 varandas, 1 salda de estar e de jantar, dois escritorios",
    "occupation_state": "Livre",
    "building_id": null,
    "status": true,
    "id": 2,
    "created_at": null,
    "updated_at": null
  },
  "building": {
    "name": "JAT35",
    "description": "Dados de teste",
    "status": true,
    "id": 1,
    "created_at": null,
    "updated_at": null,
    "contacts": [],
    "departments": [],
    "employees": [],
    "apartments": []
  },
  "contact": {
    "phone": "800793",
    "email": "comarcial@jm-tecnologias.co.mz",
    "website": "www.jm-tecnologias.co.mz",
    "building_id": null,
    "status": true,
    "id": 1,
    "created_at": null,
    "updated_at": null
  },
  "address": {
    "province": "Maputo",
    "city": "Matola",
    "nearby_hood": "PL City",
    "avenue": "Av. Patrice Lumumba",
    "number": 211,
    "building_id": null,
    "status": true,
    "id": 1,
    "created_at": null,
    "updated_at": null
  }
}
console.log(data.member)
