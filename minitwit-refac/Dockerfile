# Use the Microsoft .NET SDK as the base image
FROM mcr.microsoft.com/dotnet/sdk:7.0

# Set the working directory
WORKDIR /app

# Copy the application files to the image
COPY . /app

# Restore the application's dependencies
RUN dotnet restore

# Build the application
RUN dotnet build -c Release

# Publish the application
RUN dotnet publish -c Release -o out

# Set the working directory to the output directory
WORKDIR /app/out

#Exposing port?

# Specify the command to run the application
CMD ["dotnet", "minitwit-refac.dll"]
