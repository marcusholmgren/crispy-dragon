from typing import Dict, Any
import json
import logging
import os
import time
import uuid
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

from models.AddItem import parse_user_id
from aws_xray_sdk.core import patch_all

from models.decimalencoder import DecimalEncoder

patch_all()

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')


def get_movie(user_id, title):
    table = dynamodb.Table(os.environ['MOVIES_DYNAMODB_TABLE'])

    try:
        response = table.get_item(Key={'user_id': user_id, 'title': title})
    except ClientError as e:
        logger.error(e.response['Error']['Message'])
    else:
        return response['Item']


def get_movies(user_id):
    table = dynamodb.Table(os.environ['MOVIES_DYNAMODB_TABLE'])

    try:
        response = table.query(
            KeyConditionExpression=Key('user_id').eq(user_id)
        )
       # return response['Items']
    except ClientError as e:
        logger.error(e.response['Error']['Message'])
    else:
        return response['Items']


def get_handler(event: Dict[str, Any], context):
    headers = event['headers']
    user_id = parse_user_id(headers['authorization'][len('Bearer '):])

    movies = get_movies(user_id)
    logger.info(f"Get movies: {movies}")

    return {
        "statusCode": 200,
        "body": json.dumps({"items": movies}, cls=DecimalEncoder)
    }