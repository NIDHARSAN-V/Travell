const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const FeatureRouter = express.Router();

const genAI = new GoogleGenerativeAI("AIzaSyBRvEgIa8U8tPmkjQzJTlpTVdm-EbcbXrY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

FeatureRouter.post("/weather_info", async function (req, res) { 
    try { 
        const { weatherData } = req.body; // Expect weather data from the request

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

module.exports = FeatureRouter;
