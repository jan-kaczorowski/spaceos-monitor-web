FROM node:9.6.1

# set working directory
ENV APP_HOME /react
RUN mkdir $APP_HOME
COPY . $APP_HOME
WORKDIR $APP_HOME

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH ${APP_HOME}/node_modules/.bin:$PATH

# install and cache app dependencies
#COPY package.json /usr/src/app/package.json
RUN npm install --silent

# start app
CMD ["bash", "run.sh"]