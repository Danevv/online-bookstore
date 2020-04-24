FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
RUN npm install jw-angular-pagination

COPY /dist/angular-bookstore /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]


