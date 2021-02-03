import jwt
import logging

logger = logging.getLogger()


def parse_user_id(jwt_token: str) -> str:
    if not jwt_token:
        raise ValueError()

    payload = jwt.decode(jwt_token, options={"verify_signature": False})
    logging.info(f"Decoded JWT payload: {payload}")
    return payload['sub']
