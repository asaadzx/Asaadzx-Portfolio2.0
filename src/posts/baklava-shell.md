---
title: "Baklava Shell: A Blazing-Fast Custom Shell in Go"
date: "2026-06-19"
excerpt: "A fully static, Lua-extensible shell with a beautiful Aquia theme, git status integration, and zero runtime dependencies — written entirely in Go."
tags: ["Go", "Shell", "Lua", "CLI"]
type: "project"
featuredSize: "small"
published: true
---

# SYSTEM LOG // BAKLAVA_SHELL

Baklava Shell is a blazing-fast, customizable shell with Lua plugin support — rewritten entirely in Go. It compiles to a single ~3MB static binary with zero runtime dependencies.

## Features

- **Lua config** — theme colors, prompt format, plugin selection via `~/.zencr/config.lua`
- **Lua plugins** — overload `execute_command` and `get_prompt` from Lua scripts
- **Aquia theme** — beautiful two-line prompt with git status, exit code, and Aquia color palette
- **Readline input** — arrow-key history, line editing, history persistence
- **Fully static** — no libreadline or liblua dependencies

## Quickstart

```sh
go build -ldflags="-s -w" -o bsh ./cmd/bsh
./bsh
```

## Configuration

```lua
-- ~/.zencr/config.lua
plugins = {
    "aquia-prompt.lua",
    "autosuggest.lua",
}

theme = {
    prompt_color = "#4287f5",
    background   = "#000000",
    prompt_format = "[%u@%h %d]$ "
}

settings = {
    history_size = 1000,
    auto_complete = true
}
```

### Source

[github.com/asaadzx/BaklavaShell](https://github.com/asaadzx/BaklavaShell)
