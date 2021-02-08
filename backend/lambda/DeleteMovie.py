from typing import Dict, Any
import json
import os
import logging

import boto3
from utils.parse_user_id import parse_user_id


logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')

attachment_s3 = boto3.client('s3')


def delete_movie_image(user_id: str, title: str):
    bucket_name = os.environ['MOVIES_ATTACHMENT_BUCKET']
    object_name = f'{title}-{user_id}'

    attachment_s3.delete_object(Bucket=bucket_name, Key=object_name)


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
    delete_movie_image(user_id, title)

    return {
        "statusCode": 204,
        "body": json.dumps({})
    }
