//index created
PUT /test


//see existing indexes
GET /_cat/indices?v

//record indexed at ID 1
PUT /test/_doc/1
{
    "c1" : "HelloWorld"
}
