import { AppShell, Divider, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { ChatResponseType } from "./types/MainTypes";
import InputAreaSimple from "./components/InputAreaSimple";
import Message from "./components/Message";
import axios from "axios";

// size values in percent for the AppShell
// does not change throught the app, hence setting as a global value
const SIZE = {
  header: { heightPercent: 0.1 },
  navbar: { widthPercent: 0.1 },
  chatContainer: { heightPercent: 0.75 },
  inputContainer: { heightPercent: 0.15 },
};

function App() {
  // mantine hooks
  const { height, width } = useViewportSize();

  // user hooks, single message at a time
  const [userQuery, setUserQuery] = useState<string>(
    "Hello and introduce yourself",
  );
  const [assistantResponse, setAssistantResponse] = useState<string>("");

  useEffect(() => {
    axios
      .post<ChatResponseType>(
        "https://api.openai.com/v1/chat/completions",
        {
          // messages: JSON.stringify(msgList),
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: userQuery,
            },
          ],
          model: "gpt-3.5-turbo-0613",
        },
        {
          headers: {
            // Authorization: `Bearer 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`,
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        },
      )
      .then((res) => {
        setAssistantResponse(res.data.choices[0].message.content);
      })
      .catch((err) => console.log(err));
  }, [userQuery]);

  return (
    <>
      <AppShell
        header={{ height: height * SIZE.header.heightPercent }}
        navbar={{ width: width * SIZE.navbar.widthPercent, breakpoint: "sm" }}
      >
        <AppShell.Header>Header</AppShell.Header>
        <AppShell.Navbar>Navbar</AppShell.Navbar>
        <AppShell.Main>
          <AppShell.Section
            h={height * SIZE.chatContainer.heightPercent}
            // bg={"blue"}
            grow
            component={ScrollArea}
          >
            <ScrollArea>
              {/* render user query */}
              {<Message msgContent={userQuery} direction="flex-end" />}
              {/* render assistant's response */}
              {
                <Message
                  msgContent={assistantResponse}
                  direction="flex-start"
                />
              }
            </ScrollArea>
          </AppShell.Section>
          <AppShell.Section
            h={height * SIZE.inputContainer.heightPercent}
            // bg={"cyan"}
          >
            <Divider></Divider>
            <InputAreaSimple setUserQuery={setUserQuery} />
          </AppShell.Section>
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;
