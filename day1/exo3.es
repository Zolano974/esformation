
//commandes d'indexation des datasets récupérés sur le site elastic.com (dir datasets)
//curl -H 'Content-Type: application/x-ndjson' -X POST 'localhost:9200/bank/_bulk?pretty' --data-binary @accounts.json
//curl -H 'Content-Type: application/x-ndjson' -X POST 'localhost:9200/shakespeare/_bulk?pretty' --data-binary @shakespeare.json 