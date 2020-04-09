FROM nginx:1.17.9

RUN rm -rf /usr/share/nginx/html/*

COPY /dist/angular-bookstore /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]


