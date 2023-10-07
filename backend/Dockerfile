# Use an official PHP image as the base image
FROM php:8.2-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_pgsql

RUN groupadd -g 1000 www-user

RUN useradd -u 1000 -ms /bin/bash -g www-user www-user
# Set permissions for laraveluser
RUN chown -R www-user:www-user /var/www/html

USER www-user

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the Laravel application code into the container
COPY . .

RUN composer install

RUN cp .env.example .env && php artisan key:generate
