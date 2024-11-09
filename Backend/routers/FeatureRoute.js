const express = require("express");
const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const FeatureRouter = express.Router();
const apiKey = '4955d896-1329-4de0-bc3b-a1084f376680';
const genAI = new GoogleGenerativeAI("AIzaSyBRvEgIa8U8tPmkjQzJTlpTVdm-EbcbXrY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
FeatureRouter.post("/weather_info", async function (req, res) { 
    try { 
        const { weatherData } = req.body; // Expect weather data from the request
        console.log("Waether-----")
        // Create a prompt that includes the weather data 
        const prompt = `Is it okay to travel to ${weatherData.location} with the current temperature being ${weatherData.currentTemp}, condition being ${weatherData.condition}, and feels like ${weatherData.feelsLike}? and convert the output as each topic in each passage with spaces and new lines is compulsary`; 
        

        const result = await model.generateContent(prompt);
        
        // Extract the response text
        const rawText = result.response.text();
        
        // Format the response text while maintaining spaces and newlines
        const formattedResponse = rawText
            .replace(/\*\*/g, '') 
            .trim(); 

        console.log(formattedResponse)
        res.status(200).send(formattedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while generating the content." });
    }
});

async function getEVStations(latitude, longitude) {
    const url = `https://api.openchargemap.io/v3/poi/?output=json&latitude=${latitude}&longitude=${longitude}&maxresults=10&key=${apiKey}`;
    try {
        const response = await fetch(url);
        console.log("weather-----------")
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const stations = data.map(station => ({
            id: station.ID,
            title: station.AddressInfo?.Title || 'Unknown Location',
            address: station.AddressInfo?.AddressLine1 || 'Address not available',
            town: station.AddressInfo?.Town || 'Town not available',
            state: station.AddressInfo?.StateOrProvince || 'State not available',
            postcode: station.AddressInfo?.Postcode || 'Postcode not available',
            country: station.AddressInfo?.Country?.Title || 'Country not available',
            latitude: station.AddressInfo?.Latitude,
            longitude: station.AddressInfo?.Longitude,
            distance: station.AddressInfo?.Distance || 'Distance not available',
            distanceUnit: station.AddressInfo?.DistanceUnit === 2 ? 'km' : 'miles',
            numberOfPoints: station.NumberOfPoints,
            status: station.StatusType?.Title || 'Status not available',
            lastVerified: station.DateLastVerified || 'Not verified',
        }));

        return stations;
    } catch (error) {
        console.error('Error fetching EV stations:', error);
        return null;
    }
}

FeatureRouter.post("/ev", async (req, res) => {
    const { latitude, longitude } = req.body;
    const userLat = latitude || 13.0710422;
    const userLng = longitude || 80.2499452;

    const stations = await getEVStations(userLat, userLng);

    if (stations) {
        res.json(stations);
    } else {
        res.status(500).send('Error fetching EV stations');
    } 
});

module.exports = FeatureRouter;
