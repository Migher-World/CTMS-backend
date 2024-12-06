import * as dotenv from 'dotenv';
import * as envVar from 'env-var';

dotenv.config();

const env = {
  appUrl: envVar.get('APP_URL').required().asString(),
  jwtSecret: envVar.get('JWT_SECRET').required().asString(),
  expiresIn: envVar.get('JWT_DURATION').asString() ?? '1 year',
  dbUrl: envVar.get('DB_URL').required().asString(),
  typeormDriverExtra: envVar.get('TYPEORM_DRIVER_EXTRA').asJson(),
  port: envVar.get('PORT').asInt() ?? 3000,
  synchronize: envVar.get('TYPEORM_SYNCHRONIZE').required().asBool(),
  emailHost: envVar.get('EMAIL_HOST').required().asString(),
  emailUser: envVar.get('EMAIL_USER').required().asString(),
  emailPassword: envVar.get('EMAIL_PASSWORD').required().asString(),
  dbLogging: envVar.get('DATABASE_LOGGING').asBool(),
  docsPassword: envVar.get('DOCS_PASSWORD').required().asString(),
  redisUrl: envVar.get('REDIS_URL').required().asString(),
  mailgunApiKey: envVar.get('MAILGUN_API_KEY').required().asString(),
  mailgunDomain: envVar.get('MAILGUN_DOMAIN').required().asString(),
  appName: envVar.get('APP_NAME').required().asString(),
  environment: envVar.get('NODE_ENV').required().asString(),
  cloudinary: {
    cloudName: envVar.get('CLOUDINARY_CLOUD_NAME').asString(),
    apiKey: envVar.get('CLOUDINARY_API_KEY').asString(),
    apiSecret: envVar.get('CLOUDINARY_API_SECRET').asString(),
  },
  awsAccessKey: envVar.get('AWS_ACCESS_KEY').asString(),
  awsSecretKey: envVar.get('AWS_SECRET_KEY').asString(),
  s3BucketName: envVar.get('S3_BUCKET_NAME').asString(),
  awsRegion: envVar.get('AWS_REGION').asString(),
  encryption: {
    key: envVar.get('ENCRYPTION_KEY').required().asString(),
    iv: envVar.get('ENCRYPTION_IV').required().asString(),
    algorithm: envVar.get('ENCRYPTION_ALGORITHM').required().asString(),
  },
};

export default env;
