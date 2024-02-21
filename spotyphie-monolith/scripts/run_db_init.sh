#!/bin/bash

psql -U postgres -d spotyphie -f /docker-entrypoint-initdb.d/webede.sql

# tambahkan perintah SQL lainnya jika diperlukan