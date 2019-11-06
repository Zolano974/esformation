
GET news/_s

//preparation du mapping
PUT news
{
    "mappings" : {
        "properties" : {
            "query" : {
                "type" : "percolator"
            },
            "new_message" : {
                "type" : "text"
            }
        }
    }
}

//insertion d'un jeu de données
PUT _bulk
{ "index" : {"_index" : "news", "_id" : 1}}
{ "query" : { "match" : { "new_message" : "président élection Réforme"}}}
{ "index" : {"_index" : "news", "_id" : 2}}
{ "query" : { "match" : { "new_message" : "sport tennis football basket-ball"}}}
{ "index" : {"_index" : "news", "_id" : 3}}
{ "query" : { "match" : { "new_message" : "éducation école élève cours professeur bac lycée"}}}

//la requête ci-dessus est correcte, mais le plugin vsCode bug : il faut la lancer dans la console kibana

POST /news/_search
{
    "query" : {
        "percolate" : {
            "field" : "query",
            "document" : {
                "new_message" : "Réforme du bac et du lycée : ce qui change pour vous"
            }
        }
    }
}