//-----------------------------

//default settings: query with match : works
GET /bank/_search
{
    "query" : {
        "match" : {
            "gender" : "F"
        }
    }
}

//default settings: query with term won't work (because we compare raw value with analyzed (i.e lowercase) value)
GET /bank/_search
{
    "query" : {
        "term" : {
            "gender" : "F"
        }
    }
}

// -----------------------------
//supprimer index bank
DELETE /bank

GET /bank

// -----------------------------
//definir un mapping specifique
PUT /bank
{
    "settings": {
        "index": {
            "number_of_shards": 3,
            "number_of_replicas": 1
        }
    },
    "mappings": {
        "properties": {
            "account_number": {
                "type": "long"
            },
            "balance": {
                "type": "long"
            },
            "firstname" : {
                "type" : "keyword"
            },
            "lastname" : {
                "type" : "keyword"
            },
            "age": {
                "type": "long"
            },
            "gender" : {
                "type" : "keyword"
            },
            "address": {
                "type": "text"
            },
            "employer" : {
                "type" : "keyword"
            },
            "email" : {
                "type" : "keyword"
            },
            "city" : {
                "type" : "keyword"
            },
            "state" : {
                "type" : "keyword"
            }
        }
    }
}