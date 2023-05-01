const express = require('express');
const dynamoose = require("dynamoose");
const cors = require('cors');
const topicsRouter = require('./routes/topics');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/topics', topicsRouter);

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
  "credentials": {
      "accessKeyId": "ASIA3L4S2WA54OAV3LZS",
      "secretAccessKey": "qY9OFUafURPTbncTwnqLqS600MfcZARUnw68oSh4",
      "sessionToken": "FwoGZXIvYXdzELP//////////wEaDGeJK7u+bCr5ba34QyLIAXohd51C3Osx6dVqc8i23JrJve18cWjklT0EeSlYPm5LqODad9RjfZAEbKregCPJeduDAaKG1Ms5B+iDvegrYljopLMEs2f2waC7l2Yzc+R31x7osbvR4u/6/dxSVs0Qiv8IypgR53sLnfbQYIUIzkOJu2l4N4CXwFiasMvrdPnvdI+XrbeVjRDlJVhCFbRWm6pHuGQGaRC/OLWqezTVe6x5BxR6jLHJIHMjEb7f08swUT5c7YiAQeAIThLjOLGs2MQf1iOCocbpKND8v6IGMi1BlvdrEMdBGSBcavQSdtTAR8BAXcE+b4zxA/pQnKpgLjhjRDZRLlfkZnPzurE="
  },
  "region": "us-east-1"
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
