from typing import Dict, Any
import json
import os
import logging

import boto3
from aws_xray_sdk.core import patch_all
from models.parse_user_id import parse_user_id

patch_all()

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')


def update_movie(user_id: str, title: str, year: int, plot: str, actors: [str]):
    table = dynamodb.Table(os.environ['MOVIES_DYNAMODB_TABLE'])

    response = table.update_item(
        Key={
            'user_id': user_id,
            'title': title
        },
        ExpressionAttributeNames={
            '#movie_year': 'year',
        },
        UpdateExpression="set info.#movie_year=:y, info.plot=:p, info.actors=:a",
        ExpressionAttributeValues={
            ':y': year,
            ':p': plot,
            ':a': actors
        },
        ReturnValues="UPDATED_NEW"
    )
    return response


# Update movies keys: dict_keys(['version', 'routeKey', 'rawPath', 'rawQueryString', 'headers', 'requestContext', 'pathParameters', 'body', 'isBase64Encoded'])
# [INFO] 2021-02-04T20:22:42.564Z 64cda66a-c2db-42f5-96f7-d147a6505357 Update movies keys: dict_keys(['version', 'routeKey', 'rawPath', 'rawQueryString', 'headers', 'requestContext', 'pathParameters', 'body', 'isBase64Encoded'])

def patch_handler(event: Dict[str, Any], context):
    data = json.loads(event['body'])
    errors = []
    if 'year' not in data:
        errors.append("Missing required year field.")
    if 'actors' not in data:
        errors.append("Missing required actors field.")
    if 'plot' not in data:
        errors.append("Missing required plot field.")

    if len(errors) > 0:
        logging.error(f"Validation Failed for request: {event['body']}")
        return {
            "statusCode": 400,
            "body": json.dumps({"errors": errors})
        }

    title = event['pathParameters']['title']
    headers = event['headers']
    user_id = parse_user_id(headers['authorization'][len('Bearer '):])

    response = update_movie(user_id, title, int(data['year']), data['plot'], data['actors'])
    logger.info(f"Update movies pathParameters keys: {event['pathParameters'].keys()}")
    logger.info(f"Update response keys: {response.keys()}")

    return {
        "statusCode": 203,
        "body": json.dumps({})
    }
