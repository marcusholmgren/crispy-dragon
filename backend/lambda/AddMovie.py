from typing import Dict, Any
import json
import logging
import os
import time
import uuid
import boto3
from models.AddItem import parse_user_id
from aws_xray_sdk.core import patch_all

patch_all()

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')


def put(event: Dict[str, Any], context):
    data = json.loads(event['body'])
    errors = []
    if 'title' not in data:
        errors.append("Missing required text field.")
    if 'year' not in data:
        errors.append("Missing required year field.")
    if 'rating' not in data:
        errors.append("Missing required rating field")

    if len(errors) > 0:
        logging.error(f"Validation Failed for request: {event['body']}")
        return {
            "statusCode": 400,
            "body": json.dumps({"errors": errors})
        }

    headers = event['headers']
    user_id = parse_user_id(headers['authorization'][len('Bearer '):])

    movie_item = put_movie(user_id, data['title'], int(data['year']), data['plot'], int(data['rating']))
    #logging.info(f"Add {json.dumps(item)}")
    # write the todo to the database
    # response = table.put_item(Item=item, ReturnValues='ALL_OLD')

    #logging.info(f"PutItem response: {response['ResponseMetadata'].keys()}")
    # PutItem response: dict_keys(['RequestId', 'HTTPStatusCode', 'HTTPHeaders', 'RetryAttempts']

    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps({'item': movie_item})
    }

    return response


def put_movie(user_id, title, year, plot, rating):  # , dynamodb=None):
    # if not dynamodb:
    #     dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table(os.environ['MOVIES_DYNAMODB_TABLE'])
    movie_item = {
        'title': title,
        'user_id': user_id,
        'info': {
            'year': year,
            'plot': plot,
            'rating': rating
        }
    }
    _ = table.put_item(
        Item=movie_item
    )
    return movie_item


# if __name__ == '__main__':
#     movie_resp = put_movie("The Big New Movie", 2015,
#                            "Nothing happens at all.", 0)
#     print("Put movie succeeded:")
#     pprint(movie_resp, sort_dicts=False)
