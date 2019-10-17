FROM node

RUN curl https://install.zenaton.com | sh

WORKDIR /app

ADD . .

# install deps
RUN cd /app/worker && yarn
RUN cd /app/web_app && yarn && yarn build
RUN cd /app

RUN yarn

ENTRYPOINT ["sh", "launch_zenaton_agent.sh"]