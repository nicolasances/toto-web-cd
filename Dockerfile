FROM nginx

RUN mkdir /www

COPY www /www
COPY conf/nginx.conf /etc/nginx/nginx.conf
