"use client";

import { useState } from "react";
import { Message } from "@/types/firestore";
import { format } from "date-fns";
import { db } from "@/lib/firebase/client";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Trash2, MailOpen, Mail } from "lucide-react";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  async function handleMarkAsRead(id: string, currentStatus: string) {
    if (!id) return;
    try {
      const newStatus = currentStatus === "new" ? "read" : "new";
      await updateDoc(doc(db, "messages", id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!id || !confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await deleteDoc(doc(db, "messages", id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Message List */}
      <div className="md:col-span-1 bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-[600px]">
        <div className="p-4 border-b border-border bg-muted/30">
          <h2 className="font-semibold text-lg">Inbox</h2>
          <p className="text-xs text-muted-foreground">
            {messages.length} messages
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No messages found.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedMessage?.id === msg.id
                      ? "bg-muted/50 border-l-4 border-primary"
                      : msg.status === "new"
                      ? "bg-primary/5"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className={`text-sm font-medium ${
                        msg.status === "new"
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {msg.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {typeof msg.createdAt === "string"
                        ? format(new Date(msg.createdAt), "MMM d")
                        : "Now"}
                    </span>
                  </div>
                  <p className="text-sm font-medium truncate mb-1">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {msg.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Message Viewer */}
      <div className="md:col-span-2 bg-card rounded-xl border border-border shadow-sm flex flex-col h-[600px]">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b border-border flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold font-heading mb-2">
                  {selectedMessage.subject}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {selectedMessage.name}
                  </span>
                  <span className="hidden sm:inline">&bull;</span>
                  <span>{selectedMessage.email}</span>
                  <span className="hidden sm:inline">&bull;</span>
                  <span>
                    {typeof selectedMessage.createdAt === "string"
                      ? format(
                          new Date(selectedMessage.createdAt),
                          "PPP 'at' p"
                        )
                      : ""}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleMarkAsRead(
                      selectedMessage.id!,
                      selectedMessage.status
                    )
                  }
                  className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
                  title={
                    selectedMessage.status === "new"
                      ? "Mark as Read"
                      : "Mark as Unread"
                  }
                >
                  {selectedMessage.status === "new" ? (
                    <MailOpen size={18} />
                  ) : (
                    <Mail size={18} />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage.id!)}
                  className="p-2 text-muted-foreground hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1 whitespace-pre-wrap text-sm leading-relaxed">
              {selectedMessage.message}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
            <Mail size={48} className="mb-4 opacity-20" />
            <p>Select a message to read details</p>
          </div>
        )}
      </div>
    </div>
  );
}
