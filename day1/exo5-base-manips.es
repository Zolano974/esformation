//re-index bank into new index new_bank
POST _reindex
{
  "source": {
    "index": "bank"
  },
  "dest": {     
    "index": "new_bank"
  }
}

GET /new_bank/_doc/200


//modifier l'@ du document id=200 (update partiel)
POST /new_bank/_update/200
{
    "doc": {
        "address": "282 Queens Place"
    }
}

//modif en mode FULL
PUT /new_bank/_doc/200
{
    "account_number": 200,
    "balance": 26210,
    "firstname": "Teri",
    "lastname": "Hester",
    "age": 39,
    "gender": "M",
    "address": "666 Abbey Court",
    "employer": "Electonic",
    "email": "terihester@electonic.com",
    "city": "Martell",
    "state": "MD"
}

//count documents on index
GET /new_bank/_count

//idem
GET /bank/_count




DELETE /new_bank/_doc/202


DELETE /new_bank