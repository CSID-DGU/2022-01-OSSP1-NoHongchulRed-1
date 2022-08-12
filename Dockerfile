# get node image
FROM node:16.14.2
WORKDIR /usr/src/app
COPY server ./
COPY .env ./
COPY package.json ./
COPY package-lock.json ./
COPY requirements.txt ./

# install python & modules
RUN apt-get update
RUN apt-get install python3-pip -y
RUN ln -sf /usr/bin/python3 /usr/bin/python
RUN ln -sf /usr/bin/pip3 /usr/bin/pip
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

# install npm modules
RUN npm install
WORKDIR /usr/src/app/server
CMD ["node", "server.js"]