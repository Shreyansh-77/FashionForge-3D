// import express from "express";
// import * as dotenv from "dotenv";
// import { OpenAI } from "openai";

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// router.route("/").get((req, res) => {
//     res.status(200).json({ message: "Hello from DALL-E!" });
// });

// router.route("/").post(async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const response = await openai.images.generate({
//             prompt: prompt,
//             n: 1,
//             size: "1024x1024",
//             response_format: "b64_json",
//         });
//         const image = response.data[0].b64_json;
//         res.status(200).json({ photo: image });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong." });
//     }
// });
// export default router;


// import express from 'express';
// import fetch from 'node-fetch';

// const router = express.Router();

// router.route("/").post(async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         console.log(prompt);

//         const response = await fetch(
//             "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
//             {
//                 method: "POST",
//                 headers: {
//                     "Authorization": `Bearer ${process.env.HF_API_KEY}`
//                 },
//                 body: JSON.stringify({ inputs: prompt }),
//             }
//         );

//         const contentType = response.headers.get('content-type') || '';
//         if (contentType.includes('application/json')) {
//             const error = await response.json();
//             throw new Error(error.error || 'API Error');
//         }

//         // Then handle as image
//         const buffer = await response.arrayBuffer();
//         res.json({
//             image: `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
//         });

//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;

import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Unsplash!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Step 1: Call Unsplash Search API
    const searchRes = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    const data = await searchRes.json();
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ message: "No image found." });
    }

    // Step 2: Get image URL
    const imageUrl = data.results[0].urls.regular;

    // Step 3: Fetch image and convert to base64
    const imageRes = await fetch(imageUrl);
    const buffer = await imageRes.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const mimeType = imageRes.headers.get("content-type");

    // Step 4: Send base64 image
    res.status(200).json({ image: base64Image});
    // if(base64Image){console.log(base64Image);}

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

export default router;
