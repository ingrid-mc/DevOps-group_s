# Use an Alpine Linux base image
FROM alpine:latest

# Install SQLite
RUN apk add --no-cache sqlite

# Create the backup directory
RUN mkdir /backup

# Copy the SQLite database file into the container
COPY minitwit.db /app/

# Set the working directory
WORKDIR /app

# Expose the SQLite database port
EXPOSE 5432

# Backup the SQLite database
CMD ["cp", "minitwit.db", "/backup/"]