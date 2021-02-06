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


def delete_movie(user_id: str, title: str):
    table = dynamodb.Table(os.environ['MOVIES_DYNAMODB_TABLE'])

    response = table.delete_item(
        Key={
            'user_id': user_id,
            'title': title
        }
    )

    return response


def delete_handler(event: Dict[str, Any], context):

    title = event['pathParameters']['title']
    headers = event['headers']
    user_id = parse_user_id(headers['authorization'][len('Bearer '):])

    _ = delete_movie(user_id, title)

    return {
        "statusCode": 204,
        "body": json.dumps({})
    }
