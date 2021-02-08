from typing import Dict, Any
import json
import logging
import os
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

from utils.parse_user_id import parse_user_id
from utils.decimalencoder import DecimalEncoder


logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
attachment_s3 = boto3.client('s3')


def generate_presigned_url(user_id: str, title: str) -> str:
    bucket_name = os.environ['MOVIES_ATTACHMENT_BUCKET']
    object_name = f'{title}-{user_id}'
    try:
        return attachment_s3.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=3600)
    except ClientError as e:
        logger.error(e)
    return None


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
    logger.info(f"First movie: {movies[0]}")
    for movie in movies:
        if "movie" in movie['info']:
            movie['info']['movie'] = generate_presigned_url(user_id, movie['title'])

    logger.info(f"Get movies: {movies}")

    return {
        "statusCode": 200,
        "body": json.dumps({"items": movies}, cls=DecimalEncoder)
    }
