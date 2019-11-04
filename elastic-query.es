GET logstash/_search
{
    "query": {
        "match_all": {}
    }
}


// create a record
POST logstash/_doc
{
  "message": "from VS Code",
  "host": "Phoenix of these woods"
}


// update existing record
PUT logstash/_doc/EjGzNm4BzD4UWsaDP7Iy
{
  "message" : "updated with VSCode",
  "host": "not so phenix"
}

//multi GET