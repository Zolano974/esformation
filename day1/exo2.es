//create index with mappings
PUT /my_first_index
{
    "mappings" : {
        "properties" : {
            "myname" : {"type" : "text"},
            "istrue" : {"type" : "boolean"},
            "value" : {"type" : "integer"},
            "birth" : { 
                "type" : "date",
                "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
            }
        }
    }
}

//fetch data from index
GET /my_first_index/_search

//create record on index (POST)
POST /my_first_index/_doc
{
    "name" : "NewName 1 (POST)",
    "isTrue" : false,
    "value" : 42,
    "date" : "04/11/2019"
}


PUT /my_first_index/_doc/42
{
    "name" : "NewName 1 (PUT)",
    "isTrue" : true,
    "value" : 112,
    "date" : "27/10/1999"
}

//delete index
DELETE /my_first_index


