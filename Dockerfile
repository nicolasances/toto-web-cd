FROM nginx

RUN mkdir /www

COPY www /www
COPY www/conf/nginx.conf /etc/nginx/nginx.conf
