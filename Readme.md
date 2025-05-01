Architecture

Real-Time Sensors 
    ↓
Feature Extractor (fish weight, fish count, temp, oxygen, etc.)
    ↓
Predict Feed % (ML Model)
    ↓
Feed Amount = Biomass × Feed %
    ↓
Feed
    ↓
Collect Feedback (leftover%, movement%)
    ↓
Train model incrementally
    ↓
Repeat

