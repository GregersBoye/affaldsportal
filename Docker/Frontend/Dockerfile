FROM node:10.4
WORKDIR /code
COPY ./frontend/public /code/public
COPY ./frontend/src /code/src
COPY ./frontend/package.json /code/package.json
RUN npm install -s
RUN ls /code/src
ENTRYPOINT ["npm"]
CMD ["start"]