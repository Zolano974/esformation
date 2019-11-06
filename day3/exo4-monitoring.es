//queries to check server health

GET _cluster/health

GET _cluster/settings

GET _cluster/stats

//bloquer la création automatique d'index
PUT _cluster/settings
{
    "transient" : {
        "action.auto_create_index" : true
    }
}

//ouais ça marche pas des masses ça..
PUT yolo/_doc/1
{
    "number" : 2
}

GET yolo/_search