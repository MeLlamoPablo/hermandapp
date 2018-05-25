# Ubuntu because nnny doesn't support alpine
FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y curl

WORKDIR /frontend

# Install node and yarn
ADD ./package.json /frontend
RUN curl -so- \
    https://raw.githubusercontent.com/MeLlamoPablo/nnny/v1.0.0/nnny.sh | bash

# Add the whole frontend, so that if we have the dependencies installed on the
# host machine, the next step doesn't re-donwload them again
ADD . /frontend

# Install dependencies
RUN yarn