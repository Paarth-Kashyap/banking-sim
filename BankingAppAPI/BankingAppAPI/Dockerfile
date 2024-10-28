# Stage 1: Base Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Stage 2: Build the Project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /app

# Copy project file and restore dependencies
COPY ["BankingAppAPI.csproj", "./"]
RUN dotnet restore "BankingAppAPI.csproj"

# Copy the rest of the application code
COPY . .

# Install Entity Framework Core tools for migrations
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Build the project
RUN dotnet build "BankingAppAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Stage 3: Publish the Project
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "BankingAppAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Stage 4: Final Stage for Production
FROM base AS final

# Switch to root to install PostgreSQL dependency
USER root
RUN apt-get update && apt-get install -y libpq-dev && rm -rf /var/lib/apt/lists/*

# Switch back to app user
USER app

WORKDIR /app
COPY --from=publish /app/publish .

# Application entry point
ENTRYPOINT ["dotnet", "BankingAppAPI.dll"]
