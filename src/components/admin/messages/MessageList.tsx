"use client";

import { useState } from "react";
import { Message } from "@/types/firestore";
import { format } from "date-fns";
import { db } from "@/lib/firebase/client";
import { doc, updateDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { Trash2, MailOpen, Mail } from "lucide-react";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );

  // Derive the selected message from the props to ensure real-time updates
  const selectedMessage = messages.find((m) => m.id === selectedMessageId);

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
      if (selectedMessageId === id) setSelectedMessageId(null);
      await deleteDoc(doc(db, "messages", id));
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    }
  }

  async function handleDeleteAll() {
    if (
      messages.length === 0 ||
      !confirm(
        `Are you sure you want to delete ALL ${messages.length} messages? This cannot be undone.`
      )
    )
      return;

    try {
      const batch = writeBatch(db);
      messages.forEach((msg) => {
        if (msg.id) {
          batch.delete(doc(db, "messages", msg.id));
        }
      });
      await batch.commit();
      setSelectedMessageId(null);
    } catch (error) {
      console.error("Error deleting all messages:", error);
      alert("Failed to delete messages");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Message List */}
      <div className="md:col-span-1 bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-[600px]">
        <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">Inbox</h2>
            <p className="text-xs text-muted-foreground">
              {messages.length} messages
              {messages.filter((m) => m.status === "new").length > 0 && (
                <span className="ml-1 text-primary">
                  ({messages.filter((m) => m.status === "new").length} new)
                </span>
              )}
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <Trash2 size={16} />
              Delete All
            </button>
          )}
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
                  onClick={() => setSelectedMessageId(msg.id!)}
                  className={`p-4 cursor-pointer transition-all hover:bg-muted/50 ${
                    selectedMessageId === msg.id
                      ? "bg-muted/50 border-l-4 border-primary"
                      : msg.status === "new"
                      ? "bg-primary/5 border-l-4 border-transparent"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      {/* UNREAD INDICATOR */}
                      {msg.status === "new" && (
                        <span
                          className="w-2 h-2 rounded-full bg-primary inline-block flex-shrink-0"
                          title="Unread"
                        ></span>
                      )}
                      <span
                        className={`text-sm font-medium ${
                          msg.status === "new"
                            ? "text-primary font-bold"
                            : "text-foreground"
                        }`}
                      >
                        {msg.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
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
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {selectedMessage.name}
                    </span>
                    <span>&bull;</span>
                    <span>{selectedMessage.email}</span>
                    <span>&bull;</span>
                    <span>{selectedMessage.mobile || "N/A"}</span>
                  </div>
                  <div className="text-xs">
                    {typeof selectedMessage.createdAt === "string"
                      ? format(
                          new Date(selectedMessage.createdAt),
                          "PPP 'at' p"
                        )
                      : ""}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="relative group">
                  <button
                    onClick={() =>
                      handleMarkAsRead(
                        selectedMessage.id!,
                        selectedMessage.status
                      )
                    }
                    className={`p-2 transition-colors rounded-md ${
                      selectedMessage.status === "new"
                        ? "text-primary hover:bg-muted"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {selectedMessage.status === "new" ? (
                      <Mail size={18} />
                    ) : (
                      <MailOpen size={18} />
                    )}
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {selectedMessage.status === "new"
                      ? "Mark as Read"
                      : "Mark as Unread"}
                  </span>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => handleDelete(selectedMessage.id!)}
                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    Delete
                  </span>
                </div>
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
