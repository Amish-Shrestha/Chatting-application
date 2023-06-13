import { Card, CardContent, CardHeader, CardMedia } from "@material-ui/core";
import React, { useState } from "react";
import image from "./download.png";
import "./Chat_Bot.css";

const { Configuration, OpenAIApi } = require("openai");
function Chat_Bot() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState("Hi, How can I help you?");
  const [chat, setChat] = useState([]);
  // const umsg = { message: input };
  // const chatt = [
  //     {message: "chat", id:"user"},
  //     {message: "todo", id:"bot"},
  //     // ]
  //   id: "user"

  const sendMessage = (e) => {
    e.preventDefault();
    let umsg = { message: input, id: "user" };
    // setChat([...chat, {message: input, id: "user"}]);
    // chat.push({message: input, id: "user"});
    // setInput("");
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    openai
      .createCompletion("text-davinci-002", {
        prompt:
          `The following is a conversation with an Ecommerce customer service. .If the customer says "hi" or "hello" then the reply will be: "Hi, how can I help you?". Opening hours 24 hours. 
        Normal Delivery charge: Rs.100. 
        Delivery time is 1 hour if within 1 km 48 hours greater then that then we will contact you. 
        We have cloths available for only gents. 
        If customer ask for female cloths then the replay will be "Sorry, we do not have cloth products for females".
        If the customer ask for any other products then gents cloth then reply will be "Sorry, we have only gents wear product available". 
        Available products with prices and stock are as below: Sweaters , Rs.2000, 10 units available ,colours are black blue green. Pants, Rs.1500, 2 units available only, colours are black grey white. T-shirts, Rs.900, no units available, colours are white blue grey red Recommended Products: Sweater, Pants. 
        If the customer says random numbers, Inappropriate words, space or <space> then reply "Type it again, I cant understand you". 

        Ecommerce customer service: Hi, how can I help you?
        Customer: ${input}`,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((res) => {
        console.log(res.data.choices[0].text);
        // setTodo([...todo, )
        // chatt.push({message: res.data.choices[0].text, id: "bot"});
        // setTodo([...todo,umsg])
        setChat([
          ...chat,
          umsg,
          {
            message: res.data.choices[0].text,
            // id: "Ecommerce customer service" 
          },
        ]);
        setInput("");
        // console.log(chatt)
      });
    // setTodo([...todo,umsg])
  };
  return (
    <div className="chatbot_wrapper">
      <div className="chatbot_body">
        <div className="chatbot_card">
          <Card sx={{ maxWidth: "auto" }}>
            <CardContent>
              <div className="chatbot_card-contain">
                Ecommerce customer service:{todo}
                {chat.map((ch) => {
                  return (
                    <div>
                      <li style={{ listStyle: "none" }}>
                        {ch.message}
                      </li>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                type="text"
              />
              <button onClick={sendMessage} type="submit">
                {" "}
                Send a message
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Chat_Bot;