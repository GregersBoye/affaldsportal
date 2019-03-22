FROM node:10.4
WORKDIR /code
COPY ./frontend /code
RUN npm install -s
RUN ls /code/public
ENTRYPOINT ["npm"]
CMD ["start"]