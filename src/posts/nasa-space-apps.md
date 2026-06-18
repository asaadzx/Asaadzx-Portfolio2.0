---
title: "NASA Space Apps 2025: From EarthData to Action"
date: "2025-10-05"
excerpt: "Building a real-time air quality prediction system using NASA Harmony API, FastAPI, and satellite data — a solo backend sprint during the NASA Space Apps Challenge 2025."
tags: ["FastAPI", "Python", "NASA", "Data Science"]
type: "project"
featuredSize: "small"
published: true
---

# SYSTEM LOG // NASA_SPACE_APPS_2025

## The Challenge

"From EarthData to Action: Cloud Computing with Earth Observation Data for Predicting Cleaner, Safer Skies."

The task was to pull live satellite data from NASA's Harmony API, process it through analytical pipelines, and visualise air quality metrics across North America — all within a 48-hour sprint.

## Architecture

The project split into two repos:

### Backend — [Data-Wizards-Backend](https://github.com/asaadzx/Data-Wizards-Backend)

A FastAPI service that:

- Queries NASA Harmony API for Earth observation data
- Processes multidimensional arrays with `xarray` and `pandas`
- Exposes REST endpoints for air quality metrics
- Auto-documented via Swagger UI / ReDoc

**Stack:** Python 3.9+, FastAPI, xarray, pandas, numpy, harmony-py

### Frontend — [Data-Wizards (Team Repo)](https://github.com/abdullah-helmy/Data-Wizards)

Visualisation layer consuming the backend API to render air quality graphs and maps.

## What I Learned

This was my first time working with satellite telemetry data. The hardest part was learning `harmony-py` and `xarray` on the fly — NASA's data models are deeply nested and the API has a steep initial curve. By the end of the sprint I had a functional backend that could query, filter, and serve air quality indices in near real-time.

## Links

- Backend: [github.com/asaadzx/Data-Wizards-Backend](https://github.com/asaadzx/Data-Wizards-Backend)
- Frontend: [github.com/abdullah-helmy/Data-Wizards](https://github.com/abdullah-helmy/Data-Wizards)
