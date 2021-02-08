from typing import Dict, Any
import json
import logging
import os
import boto3
from botocore.client import Config
from utils.parse_user_id import parse_user_id

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')

attachment_s3 = boto3.client('s3', config=Config(signature_version='s3v4'))


def generate_upload_url(user_id: str, title: str) -> str:
    bucket_name = os.environ['MOVIES_ATTACHMENT_BUCKET']
    object_name = f'{title}-{user_id}'

    return attachment_s3.generate_presigned_url('put_object',
                                                Params={'Bucket': bucket_name,
                                                        'Key': object_name},
                                                ExpiresIn=30)


def update_movie_image(user_id: str, title: str):
    table = dynamodb.Table(os.environ['MOVIES_DYNAMODB_TABLE'])
    object_name = f'{title}-{user_id}'

    response = table.update_item(
        Key={
            'user_id': user_id,
            'title': title
        },
        UpdateExpression="set info.movie=:m",
        ExpressionAttributeValues={
            ':m': object_name
        },
        ReturnValues="UPDATED_NEW"
    )
    return response


def post_handler(event: Dict[str, Any], context):
    title = event['pathParameters']['title']
    headers = event['headers']
    user_id = parse_user_id(headers['authorization'][len('Bearer '):])

    response = generate_upload_url(user_id, title)
    update_movie_image(user_id, title)

    # create a response
    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }
