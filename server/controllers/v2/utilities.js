import aws from 'aws-sdk';

module.exports = {
  signS3(req, res) {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  }
};
