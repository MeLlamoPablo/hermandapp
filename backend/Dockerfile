FROM alpine:3.7

WORKDIR /backend

RUN \
    # Install python
    apk --no-cache add python3 py3-pip && \
    # Add aliases: python --> python3
    ln -s $(which python3) /usr/local/bin/python && \
    ln -s $(which pip3) /usr/local/bin/pip && \
    # Update pip
    pip install --upgrade pip

ADD ./requirements.txt /backend

# Install dependencies
RUN pip install -r requirements.txt

ADD scripts/set-run-configurations.sh /tmp/set-run-configurations.sh
RUN /tmp/set-run-configurations.sh
