FROM php:8.0-apache

# Install postresql PDO

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql pgsql 
    
RUN apt-get update && apt-get install -y wget

RUN a2enmod rewrite