# syntax=docker/dockerfile:1

# Version of PHP Server
FROM php:8.2-apache

# Use the default production configuration for PHP runtime arguments
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

RUN docker-php-ext-install mysqli

# Switch to a non-privileged user (defined in the base image) that the app will run under.
USER www-data
