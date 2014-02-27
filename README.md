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

Then visit `http://localhost:9090`.

## API

You can use `curl` to test out the API:

    => curl http://localhost:9090/_models/m123/feed/cat --data ""
    => curl http://localhost:9090/_models/m123/feed/likes --data ""
    => curl http://localhost:9090/_models/m123/feed/milk --data ""
    => curl http://localhost:9090/_models/m123/reset --data ""
    =>
    => curl http://localhost:9090/_models/m123/feed/cat --data ""
    likes
    => curl http://localhost:9090/_models/m123/feed/likes --data ""
    milk

_Note: You can use any alphanumeric string as the model ID. In the above example, we used `m123`._

### Reference

* Feed a term into the model and get a prediction

        POST /_models/{model_id}/feed/{term}

        Returns: predicted_term

* Reset sequence on model

        POST /_models/{model_id}/reset
