import "./polyfills";
import "./index.css";
import "@animxyz/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ClientProvider from "./contexts/ClientContext.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { findConversation } from "./model/conversations";
import ConversationViewWithLoader from "./views/ConversationViewWithLoader.tsx";
import NewConversationView from "./views/NewConversationView.tsx";
import WalletContext from "./contexts/WalletContext.tsx";
import FloatingChat from "./components/FloatingChat"; // Add this import
import { Conversation } from '@xmtp/xmtp-js' // Import the Conversation type if not already imported
import MessageComposerView from "./views/MessageComposerView";

async function conversationLoader({ params }: any) {
  const conversation = await findConversation(params.conversationTopic);
  return { conversation };
}
const botAddress = '0x945bfAa51cD12870CAE5e0C576483a69e97fe58c';
const router = createHashRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "c/:conversationTopic",
    element: <ConversationViewWithLoader />,
    loader: conversationLoader,
  },
  {
    path: "/",
    element: <NewConversationView autoInitAddress={botAddress} />,
  },
]);

// Create or obtain a conversation object

const { conversation } = await conversationLoader({ params: { conversationTopic: botAddress } });

const AppWithFloatingChat = () => (
  <FloatingChat>
    <RouterProvider router={router} />
    {conversation && <MessageComposerView conversation={conversation} />}
  </FloatingChat>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClientProvider>
      <WalletContext>
        <AppWithFloatingChat />
      </WalletContext>
    </ClientProvider>
  </React.StrictMode>
);
