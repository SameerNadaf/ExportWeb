"use client";

import { useEffect, useState } from "react";
import { MessageList } from "@/components/admin/messages/MessageList";
import { db, auth } from "@/lib/firebase/client";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Message } from "@/types/firestore";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for Auth
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "messages"),
          orderBy("createdAt", "desc")
        );

        const unsubscribeSnapshot = onSnapshot(
          q,
          (snapshot) => {
            const list = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                // Handle different timestamp formats (client vs server vs string)
                createdAt:
                  data.createdAt?.toDate?.().toISOString() ||
                  (typeof data.createdAt === "string"
                    ? data.createdAt
                    : new Date().toISOString()),
              } as Message;
            });

            setMessages(list);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching messages:", error);
            setLoading(false);
          }
        );

        return () => unsubscribeSnapshot();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-heading text-foreground">
          Inbox
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <div className="md:col-span-1 bg-muted/20 rounded-xl animate-pulse"></div>
          <div className="md:col-span-2 bg-muted/20 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">Inbox</h1>
      <MessageList messages={messages} />
    </div>
  );
}
