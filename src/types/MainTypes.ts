export type MessageType = {
  content: string;
  role: "user" | "assistant";
};

export type ChatRequestType = {
  messages: MessageType[];
  model: string;
};

type ChoiceType = {
  finish_reason: string;
  index: number;
  message: MessageType;
};

type UsageStatsResponseType = {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
};

export type ChatResponseType = {
  id: string;
  choices: ChoiceType[];
  created: number;
  model: string;
  system_fingerprint: string;
  object: string;
  usage: UsageStatsResponseType;
};
