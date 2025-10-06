# Minecraft AFK Bot

## Overview

This is a Node.js application that creates an automated Minecraft bot using the Mineflayer library. The bot connects to a Minecraft server and includes anti-AFK functionality to maintain an active presence. The application also provides an Express web server for monitoring and control, running on port 5000.

The bot handles connection management, automatic reconnection on errors or kicks, and periodic activity to prevent being kicked for inactivity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Bot Architecture
- **Minecraft Bot Framework**: Uses Mineflayer (v4.25.0) to create and manage the Minecraft bot instance
- **Connection Management**: Implements robust connection handling with automatic reconnection logic
- **State Tracking**: Maintains connection state (`isConnected`, `isReconnecting`) and activity timestamps
- **Anti-AFK System**: Includes interval-based activity simulation to prevent server-side AFK kicks

### Web Server Architecture
- **Framework**: Express.js (v5.1.0) for HTTP server functionality
- **Port**: Runs on port 5000 (configurable via PORT constant)
- **Purpose**: Provides monitoring and potential control endpoints for the bot

### Configuration Management
- **Environment-based Configuration**: All Minecraft connection parameters are configurable via environment variables
- **Supported Parameters**:
  - `MC_HOST`: Server hostname (default: 'localhost')
  - `MC_PORT`: Server port (default: 25565)
  - `MC_USERNAME`: Bot username (default: 'Bot')
  - `MC_VERSION`: Minecraft version (default: auto-detect)
  - `MC_AUTH`: Authentication mode (default: 'offline')

### Event-Driven Architecture
- **Bot Lifecycle Events**: Handles login, spawn, error, and kicked events
- **Automatic Recovery**: Implements reconnection logic on errors and kicks
- **Activity Tracking**: Updates last activity timestamp on successful login

### Design Patterns
- **Singleton Bot Instance**: Single global bot instance with connection state management
- **Event Handlers**: Event-driven approach for handling bot lifecycle
- **Graceful Degradation**: Error handling with automatic reconnection attempts

## External Dependencies

### Core Dependencies
- **mineflayer** (^4.25.0): Minecraft bot creation and control library
  - Handles Minecraft protocol communication
  - Provides bot movement, chat, and world interaction APIs
  - Includes authentication support (offline and Microsoft/Mojang)

- **express** (^5.1.0): Web application framework
  - HTTP server for monitoring/control endpoints
  - Middleware support for potential API expansion

### Transitive Dependencies (Notable)
- **@azure/msal-node**: Microsoft Authentication Library for bot authentication
- **jsonwebtoken**: JWT handling for authentication flows
- **uuid**: Unique identifier generation

### External Services
- **Minecraft Server**: Connects to specified Minecraft server (configurable host/port)
- **Authentication Services**: Supports both offline mode and online authentication (Mojang/Microsoft)

### Runtime Requirements
- **Node.js**: Version 16+ (required by @azure/msal-node dependency)
- **Network Access**: Requires connection to target Minecraft server