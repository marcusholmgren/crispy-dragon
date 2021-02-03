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


def post(event: Dict[str, Any], context):
    #     body = event['body']
    #     print(body)
    #     new_body = json.loads(body)
    #     result = {
    #         "event_data": event,
    #         "body": new_body
    #     }
    #     response = {
    #         "statusCode": 200,
    #         "body": json.dumps(result)
    #     }
    #     return response
    #
    #
    # def create(event, context):

    data = json.loads(event['body'])
    if 'text' not in data:
        logging.error("Validation Failed. Missing required text field.")
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing required text field."})
        }

    headers = event['headers']
    # if 'Content-Type' not in headers and headers['content-type'] != 'application/json':
    #     return {
    #         "statusCode": 400,
    #         "body": json.dumps({"error": "Only JSON content type is supported."})
    #     }

    logging.info(f"Content-Type? {'content-type' not in headers and headers['content-type'] != 'application/json'}")
    # return {
    #     "statusCode": 200,
    #     "body": json.dumps(headers)
    # }

    user_id = parse_user_id(headers['authorization'][len('Bearer '):])

    timestamp = str(time.time())

    table = dynamodb.Table(os.environ['TODOS_DYNAMODB_TABLE'])

    item = {
        'todo_id': str(uuid.uuid1()),
        'user_id': user_id,
        'text': data['text'],
        'checked': False,
        'createdAt': timestamp,
        # 'updatedAt': timestamp,
    }

    logging.info(f"Add {json.dumps(item)}")
    # write the todo to the database
    response = table.put_item(Item=item, ReturnValues='ALL_OLD')

    logging.info(f"PutItem response: {response['ResponseMetadata'].keys()}")
    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps({'item': item})
    }

    return response
