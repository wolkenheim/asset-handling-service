import * as config from 'config';
const AWS = require('aws-sdk');

const s3 = new AWS.S3({ region: 'eu-central-1' });
export { s3 };
