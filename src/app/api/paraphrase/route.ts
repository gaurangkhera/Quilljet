import { NextRequest } from "next/server";
import { sendTextValidator } from "@/lib/sendTextValidator";
import { db } from "@/db";
import axios from 'axios';


const { OpenAI } = require("openai");


const openai = new OpenAI({key: process.env.OPENAI_API_KEY});


export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { userId, text } = sendTextValidator.parse(body);

  if (!userId) return new Response('Unauthorized', { status: 401 });

  

  const messageToRephrase = text; // Assuming createdMessage has a 'text' property

  // The prompt to instruct the model to rephrase the message
  const prompt = `Rephrase the following message using awesome words: "${messageToRephrase}"`;

  // Create the request data
  const requestData = {
    prompt,
    max_tokens: 50, // You can adjust the max_tokens as needed
  };

  const aiRes = await openai.chat.completions.create({
    messages: [{role: 'user', content: prompt}],
    model: 'gpt-3.5-turbo'
  })


  await db.message.create({
    data: {
      text: text,
      output: aiRes.choices[0].message.content,
      userId: userId,
    },
  })

  return new Response(JSON.stringify({ message: aiRes }), { status: 200 })

  // try {
  //   openai.complete(requestData).then((response: any) => { console.log(response) });

  //   return new Response(JSON.stringify({ message: 'success'}), { status: 200 });
  // } catch (error) {
  //   return new Response('An error occurred', { status: 500 });
  // }
};
