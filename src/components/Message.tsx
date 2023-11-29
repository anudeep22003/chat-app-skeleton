import { Card, Flex, Text } from "@mantine/core";

type Props = {
  msgContent: string;
  direction: "flex-start" | "flex-end";
};

const Message = ({ msgContent, direction }: Props) => {
  if (!msgContent) return;
  return (
    <>
      {/* <Flex justify={msg.role === "user" ? "flex-end" : "flex-start"}> */}
      <Flex justify={direction}>
        <Card bg={"gray"} m={10} w={"100vh"}>
          <Text c={"white"}>{msgContent}</Text>
          {/* <Text c={"white"}>{msg.content}</Text> */}
        </Card>
      </Flex>
    </>
  );
};

export default Message;
