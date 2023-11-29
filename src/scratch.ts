import axios from "axios";
import { ChatResponseType } from "./types/MainTypes";

axios
  .post<ChatResponseType>(
    "https://api.openai.com/v1/chat/completions",
    {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "What is the longest canal in the world?",
        },
      ],
      model: "gpt-3.5-turbo-0613",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    },
  )
  .then((res) => console.log(res.data.choices[0].message.content))
  .catch((err) => console.log(err));
