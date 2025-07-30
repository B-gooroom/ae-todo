"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { useGetTodayMemo, useUpsertMemo } from "@/hooks/memos/useMemos";
import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

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
  onError(error: Error) {
    throw error;
  },
  nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, LinkNode],
};

function Editor() {
  const [editor] = useLexicalComposerContext();
  const { data: todayMemo, isLoading } = useGetTodayMemo();
  const { mutate: upsertMemo } = useUpsertMemo();
  const isInitialized = useRef(false);

  // 초기 데이터 로드
  useEffect(() => {
    if (!isLoading && !isInitialized.current) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        if (todayMemo?.text) {
          // 간단한 텍스트 노드로 설정
          const paragraph = $createParagraphNode();
          const textNode = $createTextNode(todayMemo.text);
          paragraph.append(textNode);
          root.append(paragraph);
        }
      });
      isInitialized.current = true;
    }
  }, [todayMemo, editor, isLoading]);

  return (
    <div className="w-full">
      <p className="text-white text-base mb-2 border-b border-gray-600 pb-2">
        memo
      </p>
      {isLoading && <div className="text-gray-400 text-sm p-2">로딩 중...</div>}
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
  const { mutate: upsertMemo } = useUpsertMemo();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (editorState: any) => {
    editorState.read(() => {
      const root = $getRoot();
      const content = root.getTextContent();

      // 디바운스 처리 (500ms 후에 저장)
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        // 빈 내용이어도 저장 (trim() 제거)
        upsertMemo(content);
      }, 500);
    });
  };

  return (
    <div className="w-[60%] h-full bg-[#2B2D32] border-r-2 border-gray-500 py-6 px-2 sm:px-4">
      <LexicalComposer initialConfig={initialConfig}>
        <Editor />
        <HistoryPlugin />
        <ListPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>
    </div>
  );
}
