---
title: "Epyac v1: Initial Quantized Core Architecture"
date: "2025-11-10"
excerpt: "The foundation system log charting the initial compilation, token testing, and baseline quantization parameters of the Epyac architecture."
tags: ["LLM", "Ollama", "Baseline"]
type: "project"
featuredSize: "small"
published: true
---

# SYSTEM LOG // EPYAC_V1

This document charts the initial architectural framework of the Epyac local intelligence experiment. Built as a baseline validation system for running quantized model parameters directly inside consumer workstations, v1 proved the viability of offline student research companions.

### Base Repository Deployment
- **Ollama Model Core:** [ollama.com/asaad/epyac.1](https://ollama.com/asaad/epyac.1)

### Key Milestones:
- Successfully packed the model tensor shapes into an ultra-low footprint file matrix.
- Provided initial benchmarking metrics for CPU/GPU memory split configurations.

```bash
# Fetch the initial legacy model block
ollama run asaad/epyac.1
```
