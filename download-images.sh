#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/pets
mkdir -p public/images/places
mkdir -p public/images/vets

# Download pet-related images
curl -L "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=800&fit=crop" -o "public/images/pets/hero-1.jpg"
curl -L "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=800&fit=crop" -o "public/images/pets/hero-2.jpg"
curl -L "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop" -o "public/images/pets/dog-recovery.jpg"
curl -L "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop" -o "public/images/pets/cat-adoption.jpg"
curl -L "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop" -o "public/images/pets/dog-training.jpg"

# Download place-related images
curl -L "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop" -o "public/images/places/cafe-1.jpg"
curl -L "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800&h=600&fit=crop" -o "public/images/places/park-1.jpg"
curl -L "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop" -o "public/images/places/hotel-1.jpg"
curl -L "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop" -o "public/images/places/restaurant-1.jpg"

# Download vet-related images
curl -L "https://images.unsplash.com/photo-1516734212186-65266f08a5e4?w=800&h=600&fit=crop" -o "public/images/vets/vet-1.jpg"
curl -L "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop" -o "public/images/vets/clinic-1.jpg"
curl -L "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=600&fit=crop" -o "public/images/vets/hospital-1.jpg" 