FROM ubuntu:bionic

ENV NODE_VERSION=10.14.1

# install latest python
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
      curl \
      software-properties-common \
      gettext \
      git \
      git-lfs \
      python2.7 \
      python-pip \
      python-sphinx

# add yarn ppa
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# install nodejs and yarn
RUN apt-get update && \
    curl -sSO https://deb.nodesource.com/node_10.x/pool/main/n/nodejs/nodejs_$NODE_VERSION-1nodesource1_amd64.deb && \
    dpkg -i ./nodejs_$NODE_VERSION-1nodesource1_amd64.deb && \
    rm nodejs_$NODE_VERSION-1nodesource1_amd64.deb && \
    apt-get install yarn

RUN git lfs install

COPY . /kolibri

VOLUME /kolibridist/  # for mounting the whl files into other docker containers

CMD cd /kolibri && \
    pip install -r requirements/dev.txt && \
    pip install -r requirements/build.txt && \
    yarn install && \
    make dist && \
    make pex && \
    cp /kolibri/dist/* /kolibridist/
