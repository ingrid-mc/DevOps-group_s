# Use an official Ubuntu runtime as a parent image
FROM ubuntu:latest

# Update the package list and install necessary packages
RUN apt-get update && \
    apt-get install -y gcc sqlite3 libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory to /app
WORKDIR /app

# Copy the flag_tool.c file into the container at /app
COPY flag_tool.c /app

# Compile the C program with SQLite3 library
RUN gcc -o flag_tool flag_tool.c -lsqlite3

# Define the command to run the executable
CMD ["./flag_tool"]