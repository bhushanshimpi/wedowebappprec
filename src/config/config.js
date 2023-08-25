require("dotenv").config(); //instatiate environment variables

let CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || "development";
CONFIG.port = process.env.PORT || 9003;
CONFIG.appName = process.env.APP_NAME || "Mi-Type";
CONFIG.baseUrl = process.env.BASEURL || "http://172.104.44.157:" + CONFIG.port;
CONFIG.appImageUrl =
  process.env.APPIMAGEURL || "http://172.104.44.157/mi-type/public/images/";
CONFIG.imageBaseUrl =
  process.env.IMAGE_BASE_URL || "http://172.104.44.157/mi-type/";

//** MongoDB Creds */

CONFIG.mongo_db_name = process.env.MONGODB_DB_NAME || "";
CONFIG.mongo_db_user = process.env.MONGODB_USER || "";
CONFIG.mongo_db_password = process.env.MONGODB_PASSWORD || "";
CONFIG.mongo_db_local = process.env.MONGODB_LOCAL || "";
CONFIG.mongo_db_url = process.env.MONGODB_URL || "";

//** JWT Creds */
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || "";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || "10000";

//** Salt Round for Encrypt Password */
CONFIG.salt_round = process.env.BCRYPT_SALT_ROUND || 10;

//** Status Codes */
CONFIG.status_zero = process.env.STATUS_ZERO || 0; //If error
CONFIG.status_one = process.env.STATUS_ONE || 1; //If success
CONFIG.status_two = process.env.STATUS_TWO || 2; //If social account not exist
CONFIG.status_internal_error = process.env.STATUS_500 || 500; //Internal server error
CONFIG.status_forbidden_error = process.env.STATUS_403 || 403; //Forbidden error

//** AWS SES Creds */
CONFIG.aws_access_keyid = process.env.AWS_SES_ACCESS_KEYID || "";
CONFIG.aws_secret_access_key = process.env.AWS_SES_SECRET_ACCESS_KEY || "";
CONFIG.aws_region = process.env.AWS_SES_REGION || "";
CONFIG.aws_from_email = process.env.AWS_FROM_EMAIL || CONFIG.appName + " <>";
CONFIG.aws_reply_to = process.env.AWS_REPLY_TO || CONFIG.appName + " <>";

CONFIG.fcm_server_key = process.env.FCM_SERVER_KEY || "";
CONFIG.collapse_key = process.env.FCM_COLLAPSE_KEY || "green";

//** Header Status Codes */
CONFIG.STATUS_HTTP_OK = process.env.STATUS_HTTP_OK || 200;

//** Firebase Creds */
CONFIG.firebase_server_key = process.env.FIREBASE_SERVER_KEY || "";

//** Time zone */
CONFIG.time_zone = process.env.TIME_ZONE || "";

//** Salt Round for Encrypt Password */
CONFIG.salt_round = parseInt(process.env.BCRYPT_SALT_ROUND) || 10;

//* SMTP Creds /
CONFIG.smtp_host = process.env.SMTP_HOST || "";
CONFIG.smtp_user = process.env.SMTP_USER || "";
CONFIG.smtp_pass = process.env.SMTP_PASSWORD || "";
CONFIG.miles = process.env.MILES || "";
CONFIG.users_feed_limit = process.env.USERS_FEED_LIMIT || "";

CONFIG.device_type_android = process.env.DEVICE_TYPE_ANDROID || "android";
CONFIG.device_type_ios = process.env.DEVICE_TYPE_IOS || "ios";

module.exports = CONFIG;
