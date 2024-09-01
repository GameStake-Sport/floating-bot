import { useLoaderData } from "react-router-dom";
import ConversationView from "./ConversationView";
import { ReactElement } from "react";
import { Conversation } from "../model/db";

interface ConversationViewWithLoaderProps {
  isFloating?: boolean;
}

interface LoaderData {
  conversation: Conversation;
}

export default function ConversationViewWithLoader({ isFloating }: ConversationViewWithLoaderProps): ReactElement {
  const data = useLoaderData() as LoaderData;
  
  // Add a null check before accessing conversation
  if (!data || !data.conversation) {
    return <div>Loading...</div>; // or some other loading indicator
  }
  
  return (
    <ConversationView conversation={data.conversation} />
  );
}
