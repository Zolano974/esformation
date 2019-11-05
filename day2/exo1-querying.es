GET /bank/_search

// -----------------------------------------------------
//chercher les comptes client Fulton et Teri (firstname)
GET /bank/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "match": {
                        "firstname": "Futon"
                    }
                },
                {
                    "match": {
                        "firstname": "Teri"
                    }
                }
            ]
        }
    }
}

// /!\ Différence entre filter et must ==> filter n'affecte pas le score des records retournés, alors que must OUI

// -----------------------------------------------------
//chercher dans 'bank' le nombre de femmes
//TODO: pourquoi avec "term" au lieu de "match" je n'ai aucun resultat ???
// ==> parce que dans le cas de "match", le param d'entrée est préprocessé avant comparison, et dans le cas de "term" non (la valeur est toujours analysée)
GET /bank/_count
{
    "query": {
        "bool": {
            "filter": [
                {
                    "match": {
                        "gender": "F"
                    }
                }
            ]
        }
    }
}

//avec le "term", si on veut éviter de manuellement lowercaser la recherche,
// on doit accéder à la proprioété "keyword" de la clef recherchée 
GET /bank/_count
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "gender.keyword": "F"
                    }
                }
            ]
        }
    }
}

// -----------------------------------------------------
//chercher les jeunes clients (<30 ans)
//ajouter la parie "size: 3" à la requête
GET /bank/_search
{
    "query": {
        "range": {
            "age": {
                "lte": 30
            }
        }
        
    },
    "size": 3
}

// -----------------------------------------------------
//chercher avec une seule requête les comptes : 49, 200, 500, 900
GET /bank/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "term": {
                        "account_number": 49
                    }
                },
                {
                    "term": {
                        "account_number": 200
                    }
                },
                {
                    "term": {
                        "account_number": 500
                    }
                },
                {
                    "term": {
                        "account_number": 900
                    }
                }
            ]
        }
    }
}


// -----------------------------------------------------
//chercher les clients de la ville "Belvoir" (with match)
GET /bank/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "match": {
                        "city": "Belvoir"
                    }
                }
            ]
        }
    }
}

//now with term
GET /bank/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "city.keyword": "Belvoir"
                    }
                }
            ]
        }
    }
}


// -----------------------------------------------------
//chercher les clients habitant l'état du TX
GET /bank/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "match": {
                        "state": "TX"
                    }
                }
            ]
        }
    },
    "size" : 100 // default: size 10
}


GET /bank/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "state.keyword": "TX"
                    }
                }
            ]
        }
    },
    "size" : 100 // default: size :10
}

// -----------------------------------------------------
//chercher les clientes (F) de 25-45 ans habitant le TX
GET /bank/_search
{
    "query": {

        "bool": {
            "must" : [
                {
                    "term" : {
                        "gender.keyword" : "F"
                    }
                },
                {
                    "range" : {
                        "age": {
                            "lte": 45,
                            "gte" : 25
                        }
                    }
                }
            ],
            "filter": [
                {
                    "term": {
                        "state.keyword": "TX"
                    }
                }
            ]
        }
    },
    "size" : 100 // default: size :10
}

//without filter, all clauses in the "must"
GET /bank/_search
{
    "query": {

        "bool": {
            "must" : [
                {
                    "term" : {
                        "state.keyword": "TX"
                    }
                },
                {
                    "range" : {
                        "age": {
                            "lte": 45,
                            "gte" : 25
                        }
                    }
                },
                {
                    "term": {
                        "gender.keyword" : "F"
                    }
                }
            ]
        }
    },
    "size" : 100 // default: size :10
}



// -----------------------------------------------------
//chercher toutes les clientes SAUF celles (de 25-45 ans qui habitent l'étt du TX)
//chercher les clientes (F) de 25-45 ans habitant le TX

    //WARNING : IMPOSSIBLE QUERY ?

    // `je veux toutes les femmes, sauf celles qui (sont du texas et on 25-45 ans)`
    //GL HaveFun, le formateur n'a pas réussi sur le coup


//essai 1
//fail: le must_not traite les 2 conditions de manières séparées et non combinées (i.e les femmes des etats non-TX sont également limitées sur a tranche d'age)
GET /bank/_search
{
    "query": {
        "bool": {
            "must_not" : [
                {
                    "range" : {
                        "age": {
                            "lte": 45,
                            "gte" : 25
                        }
                    }
                },
                {
                    "term" : {
                        "state.keyword": "TX"
                    }
                }
            ],
            "filter": [
                
                {
                    "term": {
                        "gender.keyword" : "F"
                    }
                }
            ]
        }
    },
    "size" : 100 // default: size :10
}

//essai 2
// fail: le should traite les 2 conditions séparément, on a donc des F TX age [25-45], ce qui est non-souhaité
GET /bank/_search
{
    "query": {
        "bool": {
            "should" : {
                "bool" : {
                    "must_not" : [
                        {
                            "term" : {
                                "state.keyword": "TX"
                            }
                        },
                        {
                            "range" : {
                                "age": {
                                    "lte": 45,
                                    "gte" : 25
                                }
                            }
                        }
                    ]
                }
            },
            "filter": [
                {
                    "term": {
                        "gender.keyword" : "F"
                    }
                }
            ]
        }
    },
    "size" : 100 // default: size :10
}

//correction: Merci Alex
//le must_not : bool : must permet que les 2 clauses soient traitées de manière combinée et no séparée
POST /bank/_search
{
    "query": {
        "bool": {
            "must_not": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "state.keyword": "TX"
                            }
                        },
                        {
                            "range": {
                                "age": {
                                    "lte": 45,
                                    "gte": 25
                                }
                            }
                        }
                    ]
                }
            },
            "filter": [
                {
                    "term": {
                        "gender.keyword": "F"
                    }
                }
            ]
        }
    },
    "size": 100
}

// -----------------------------------------------------
//changer l'@ du client "Teri Hester" doc id 200: "538 Fane"
POST /new_bank/_update/200
{
    "doc": {
        "address": "538 Fane"
    }
}

GET /new_bank/_doc/200

// -----------------------------------------------------
//ajouter un champ "emailpro" a l'utilisateur Fulton Holt id 49
POST /new_bank/_update/49
{
    "doc" : {
        "promail" : "yolo@lamouche.zob"
    }
}

GET /new_bank/_doc/49

// -----------------------------------------------------
// INcrémenter l'âge du client Fluton Holt (id 49)

POST /new_bank/_update/49
{
    "script" : {
        "source" : "ctx._source.age += params.ageing",
        "lang" : "painless",
        "params" : {
            "ageing" : 2
        }
    }
}

GET /new_bank/_doc/49   


// -----------------------------
//Helpers for logstash exercises

GET /exo3bis/_count

GET /exo3/_count

GET /exo3/_search

DELETE /exo3bis