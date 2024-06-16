
import {GoogleGenerativeAI, HarmCategory,
  HarmBlockThreshold,} from '@google/generative-ai';

const apiKey = 'AIzaSyBHhCLAWHfO3bKlt1uCfjyF8fuWopg8ihk';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

export async function run(text:string) {
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(text);
  console.log(text);
  console.log(result);
  return result.response.text();
}

