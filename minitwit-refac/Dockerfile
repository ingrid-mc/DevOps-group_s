FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/runtime:7.0-alpine
WORKDIR /app
COPY --from=mcr.microsoft.com/dotnet/sdk:7.0-alpine /app/out .

EXPOSE 5256

ENTRYPOINT ["dotnet", "minitwit-refac.dll"]
