# syntax=docker/dockerfile:1

FROM python:3.9-slim-buster

WORKDIR /backend

COPY requirements.txt requirements.txt

RUN pip3 install --upgrade pip

RUN pip3 install -r requirements.txt

COPY ./app ./app

CMD [ "python3", "/backend/app/main.py" ]
