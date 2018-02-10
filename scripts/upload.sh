if [ -z $CIRCLECI ]; then
  echo "This script should run on CircleCI only. Bailing..."
  exit 1
fi

S3_BUCKET=chameleon-js
S3_BUCKET_FOLDER=$1

if [ -z $1 ]; then
  S3_BUCKET_FOLDER=$NODE_ENV
fi

echo "***** About to deploy build to $S3_BUCKET/$S3_BUCKET_FOLDER"

# copy all of the files to aws
aws s3 cp ./dist/ s3://$S3_BUCKET/$S3_BUCKET_FOLDER \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read \
  --recursive

# specifically upload the fonts, because they're getting the wrong content-type
# TODO look into this
# aws s3 cp ./dist/
GITHASH=$(ls -1 ./dist/ | head -n 1)

aws s3 cp "./dist/$GITHASH/Snell Roundhand Script.subset.ttf" \
  s3://$S3_BUCKET/$S3_BUCKET_FOLDER/$GITHASH/ \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read \
  --content-type font/ttf

aws s3 cp "./dist/$GITHASH/CaviarDreams.subset.ttf" \
  s3://$S3_BUCKET/$S3_BUCKET_FOLDER/$GITHASH/ \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read \
  --content-type font/ttf

aws s3 cp "./dist/$GITHASH/Datalegreya-Dot.subset.otf" \
  s3://$S3_BUCKET/$S3_BUCKET_FOLDER/$GITHASH/ \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read \
  --content-type font/otf

aws s3 cp "./dist/$GITHASH/spinwerad.subset.ttf" \
  s3://$S3_BUCKET/$S3_BUCKET_FOLDER/$GITHASH/ \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read \
  --content-type font/ttf


if [ $? -ne 0 ]; then
  echo "***** Failed uploading build to $S3_BUCKET/$S3_BUCKET_FOLDER"
  exit 1
fi

echo "***** Succeeded uploading build to $S3_BUCKET/$S3_BUCKET_FOLDER"
