"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection } from "lexical";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";

const initialConfig = {
  namespace: "MyEditor",
  theme: {
    // Tailwind 스타일 사용 가능
    paragraph: "mb-2",
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
    },
    list: {
      ul: "list-disc pl-6",
      li: "mb-1",
    },
    heading: {
      h1: "text-2xl font-bold",
      h2: "text-xl font-bold",
      h3: "text-lg font-bold",
      h4: "text-base font-bold",
      h5: "text-sm font-bold",
    },
  },
  onError(error: any) {
    throw error;
  },
  nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, LinkNode],
};

function Editor() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="w-full">
      <p className="text-white text-base mb-2 border-b border-gray-600 pb-2">
        memo
      </p>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="min-h-screen p-2 outline-none text-sm text-gray-300" />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
}

export default function LexicalEditor() {
  return (
    <div className="w-[60%] h-full bg-[#2B2D32] border-r-2 border-gray-500 py-6 px-2 sm:px-4">
      <LexicalComposer initialConfig={initialConfig}>
        <Editor />
        <HistoryPlugin />
        <ListPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const root = $getRoot();
              const selection = $getSelection();
              console.log("root", root.getTextContent());
            });
          }}
        />
      </LexicalComposer>
    </div>
  );
}
