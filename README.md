# Fluent Server

A server-based API for interacting with [Fluent](https://github.com/chetan51/nupic.fluent).

## Installation

Requirements:

- [Fluent](https://github.com/chetan51/nupic.fluent)

Install other requirements:

    pip install -r requirements.txt

## Usage

Run:

    python server.py 9090

Then you can use `curl` to test out the API:

    => curl http://localhost:9090/_models/m123/feed/cat --data ""
    => curl http://localhost:9090/_models/m123/feed/likes --data ""
    => curl http://localhost:9090/_models/m123/feed/milk --data ""
    => curl http://localhost:9090/_models/m123/reset --data ""
    =>
    => curl http://localhost:9090/_models/m123/feed/cat --data ""
    likes
    => curl http://localhost:9090/_models/m123/feed/likes --data ""
    milk
