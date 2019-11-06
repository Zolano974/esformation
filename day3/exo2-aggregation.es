GET /bank/
GET /bank/_search

//-------------------------------------------------------
//découper (GROUP BY) les clients dans l'index par "state"
POST /bank/_search
{
    "size" : 0,
    "aggs" : {
        "bystate" : {
            "terms" : {"field" : "state"}
        }
    }
}


//-------------------------------------------------------
//faire une aggrégation pour afficher le nombre d'utilisateurs 
POST /bank/_search
{
    "size": 0,
    "query": {
        "bool": {
            "must": [
                {
                    "term": {
                        "state": "TX"
                    }
                }
            ]
        }
    },
    "aggs": {
        "byage": {
            "histogram": {
                "field": "age",
                "interval": 10
            }
        }
    }
}

//-------------------------------------------------------
//on kibana