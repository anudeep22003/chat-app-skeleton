import { Textarea } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { getHotkeyHandler } from "@mantine/hooks";
import { useState } from "react";

type Props = {
  setUserQuery: (query: string) => void;
};

const InputAreaSimple = ({ setUserQuery }: Props) => {
  const [v, setV] = useState<string>("");
  const handleSubmit = () => {
    setUserQuery(v);
    setV("");
  };
  return (
    <>
      <Textarea
        mx={10}
        py={10}
        autosize
        placeholder="enter text here"
        rightSection={<IconSend />}
        onChange={(event) => setV(event.target.value)}
        value={v}
        onKeyDown={getHotkeyHandler([["mod+Enter", handleSubmit]])}
      />
    </>
  );
};

export default InputAreaSimple;
