import type { AutomationKeyType } from './types';

function getServerPath() {
  return 'npx -y @classroomio/mcp';
}

export function getAutomationSetupSecret(secret: string | null) {
  return secret ?? '<paste-your-mcp-key>';
}

export function getClaudeCodeSnippet(secret: string | null) {
  const apiKey = getAutomationSetupSecret(secret);

  return `claude mcp add-json gurukulx '{
  "command": "npx",
  "args": ["-y", "@classroomio/mcp"],
  "env": {
    "CLASSROOMIO_API_URL": "https://api.gurukulx.com",
    "CLASSROOMIO_API_KEY": "${apiKey}"
  }
}'`;
}

export function getCodexSnippet(secret: string | null) {
  const apiKey = getAutomationSetupSecret(secret);

  return `codex mcp add gurukulx \\
  --env CLASSROOMIO_API_URL=https://api.gurukulx.com \\
  --env CLASSROOMIO_API_KEY=${apiKey} \\
  -- npx -y @classroomio/mcp`;
}

export function getOpenCodeSnippet(secret: string | null) {
  const apiKey = getAutomationSetupSecret(secret);

  return `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "gurukulx": {
      "type": "local",
      "command": ["npx", "-y", "@classroomio/mcp"],
      "enabled": true,
      "environment": {
        "CLASSROOMIO_API_URL": "https://api.gurukulx.com",
        "CLASSROOMIO_API_KEY": "${apiKey}"
      }
    }
  }
}`;
}

export function getCursorSnippet(secret: string | null) {
  const apiKey = getAutomationSetupSecret(secret);

  return `{
  "mcpServers": {
    "gurukulx": {
      "command": "npx",
      "args": ["-y", "@classroomio/mcp"],
      "env": {
        "CLASSROOMIO_API_URL": "https://api.gurukulx.com",
        "CLASSROOMIO_API_KEY": "${apiKey}"
      }
    }
  }
}`;
}

export function getDefaultAutomationKeyLabel(type: AutomationKeyType) {
  switch (type) {
    case 'mcp':
      return 'GurukulX MCP';
    case 'api':
      return 'GurukulX API';
    case 'zapier':
      return 'GurukulX Zapier';
  }
}

export function getAutomationKeyTypeLabel(type: AutomationKeyType) {
  switch (type) {
    case 'mcp':
      return 'MCP';
    case 'api':
      return 'API';
    case 'zapier':
      return 'Zapier';
  }
}

export function getMaskedAutomationSecret(prefix: string) {
  return `${prefix}...`;
}

export function getCopyableServerCommand() {
  return getServerPath();
}
