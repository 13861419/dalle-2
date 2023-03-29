# Dall-E 2 AI Art Generator

This project will generate images from text using AI and uses QStash to manage serverless function timeouts.

![OG Image](/public/ogimage.png)

## How it works

It uses an ML model from OpenAI called DALLE-2 to generate an image using AI with just a text description. When text is submitted, the application proxies calls to the OpenAI API via QStash in `/api/image`. QStash sends responses to `/api/callback` in the form of an image URL, which is persisted to Upstash Redis. After calling the OpenAI API, the client polls Redis and loads the image on the page once it's available.

Because API calls are handled by QStash rather than within the Vercel serverless function, they will not time out when deployed on Vercel's Hobby plan, which has a timeout limit of 10s.

## Running Locally

To run this locally, you'll need to sign up to https://openai.com and create a new API key ($18 of free credit is available for new users) and set OPENAI_API_KEY accordingly. You'll also need to set environment variables to connect to Upstash: you can do this by [installing the Vercel Upstash integration](https://vercel.com/integrations/upstash).

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

