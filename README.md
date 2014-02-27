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

    curl http://localhost:9090/_models/m123/feed/cat --data ""
    # => [{'term': {'string': ''}, 'type': 'term'}]
    curl http://localhost:9090/_models/m123/feed/likes --data ""
    # => [{'term': {'string': ''}, 'type': 'term'}]
    curl http://localhost:9090/_models/m123/feed/milk --data ""
    # => [{'term': {'string': ''}, 'type': 'term'}]
    curl http://localhost:9090/_models/m123/reset --data ""
    # => [{'type': 'reset'}]

    => curl http://localhost:9090/_models/m123/feed/cat --data ""
    # => [{'term': {'string': 'likes'}, 'type': 'term'}]
    curl http://localhost:9090/_models/m123/feed/likes --data ""
    # => [{'term': {'string': 'milk'}, 'type': 'term'}]

_Note: You can use any alphanumeric string as the model ID, and a model will be created if it doesn't already exist. In the above example, we used `m123`._

### Reference

* Feed a term into the model and get a prediction

        POST /_models/{model_id}/feed/{term}

    Returns: List of dictionaries, one for each predicted term

        [
            {
                'type': 'term',
                'term': {'string': 'cat'}
            },
            ...
        ]

    _Note: Currently, only one prediction is returned._

* Reset sequence on model

        POST /_models/{model_id}/reset

    Returns: List of one dictionary

        [
            {'type': 'reset'}
        ]
