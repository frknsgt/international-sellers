DOCKER_HOST=ssh://root@10.34.239.2
CONTAINER_NAME=alkera-bingo-website
TARGET_PORT=4220
SOURCE_PORT=80
IMAGE_NAME=$CONTAINER_NAME

npm run build
docker -H $DOCKER_HOST stop $CONTAINER_NAME
docker -H $DOCKER_HOST rm $CONTAINER_NAME
docker -H $DOCKER_HOST build -t $IMAGE_NAME -f docker/Dockerfile .
docker -H $DOCKER_HOST run -d --name=$CONTAINER_NAME --restart=always -p $TARGET_PORT:$SOURCE_PORT -t $IMAGE_NAME
rm -rf dist
