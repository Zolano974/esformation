
GET /shakespeare/_search


//recherche en full text pour trouver le proverbe de shakespeare
POST /shakespeare/_search
{
    "query": {
        "match": {
            "text_entry": "All the world's a stage and all the men and women merely players"
        }
    },
    "size": 100
}

//results found: 10000 (all dataset)

//score of 3 first results :
//  1 -> 40.79
//  2 -> 23.37
//  3 -> 19.01

//les scores sont différents car les portions de la phrase recherchée sont différentes (pertinence)

//P2 a un meilleur score car l'entrée contient  + de mots du pattern recherché

//optimisation: faire passer P1 en 1er en jouant sur le weight des termes de recherche
POST /shakespeare/_search
{
    "query": {
        "function_score": {
            "query": {
                "match": {
                    "text_entry": "All the world's a stage and all the men and women merely players"
                }
            },
            "functions": [
                {
                    "filter": {
                        "match": {
                            "text_entry": "stage"
                        }
                    },
                    "weight": 5
                },
                {
                    "filter": {
                        "match": {
                            "text_entry": "women"
                        }
                    },
                    "weight": 2
                }
            ],
            "min_score" : 80
        }
    }
}