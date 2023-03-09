Build Image:
docker build . -t flagtoolimage

docker run --name flag_tool flagtoolimage

Run Container
docker exec flag_tool ./flag_tool f 123