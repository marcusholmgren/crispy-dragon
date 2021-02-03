![Crispy Dragon CI](https://github.com/marcusholmgren/crispy-dragon/workflows/Crispy%20Dragon%20CI/badge.svg)

# crispy-dragon
Dragon spotting application

## Architectural decision are recorded
Architectural Decision Records [ADR](./docs/README.md) for this microservice architecture are located in the `/docs` folder.

## Backend

Built with [Serverless](https://www.serverless.com) framework against [AWS Lambda](https://aws.amazon.com/lambda/)

### Usage
#### Setup
| **Step** | **Command** |**Description**|
|---|-------|------|
|  1. | `npm install -g serverless` | Install Serverless CLI  |
|  2. | `npm install` | Install Serverless dependencies  |
|  3. | Set up an AWS account with admin permissions | [Documentation](https://serverless.com/framework/docs/providers/aws/guide/credentials/)  |

#### Development
| **Step** | **Command** |**Description**|
|---|-------|------|
|  1. | `python3 -m venv .env` | Creation of virtual environments (using [venv](https://docs.python.org/3.8/library/venv.html)) |
|  2. | `source .env/bin/activate` | Activate virtual environment|
|  3. | `pip install -r requirements.txt` | Install dependencies|


To stop your virtual environment run `deactivate` in the terminal.

## Deployment

	`sls deploy -v`

## Frontend

Built with [React](https://reactjs.org) using [Snowpack](https://www.snowpack.dev) and [Tailwind CSS](https://tailwindcss.com) for styling.


### Environment variables

In your `.env` file you need the following variables

```
SNOWPACK_PUBLIC_REGION=us-east-1
SNOWPACK_PUBLIC_USER_POOL_ID=us-east-1_SW382wGyU
SNOWPACK_PUBLIC_USER_POOL_WEB_CLIENT_ID=4t3RdWfp5ydwadefjthscrdrcd
```



## Resources

* [Cloud Developer](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990) Nanodegree at [Udacity](https://www.udacity.com/)
* [Serverless Auth with AWS HTTP APIs](https://www.serverless.com/blog/serverless-auth-with-aws-http-apis)
* [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
