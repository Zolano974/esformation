//créer un alias myalias et y ajouter l'index bank et shakespeare
POST /_aliases
{
    "actions": [
        {
            "add": {
                "index": "bank",
                "alias": "myalias"
            }
        },
        {
            "add": {
                "index": "shakespeare",
                "alias": "myalias"
            }
        }
    ]
}

GET /_aliases

GET /myalias/_search

GET /myalias/_search
{
    "query" : {
        "match" : {
            "text_entry" : "All the world's a stage"
        }
    }
}
