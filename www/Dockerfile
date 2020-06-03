FROM php:7.4-apache

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo pdo_mysql

