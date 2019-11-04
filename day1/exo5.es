//re-index bank into new index new_bank
POST _reindex
{
  "source": {
    "index": "bank"
  },
  "dest": {
    "index": "new_bank"
  }
}