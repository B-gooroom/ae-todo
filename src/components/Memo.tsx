"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $getRoot,
  $createParagraphNode,
  $createTextNode,
  EditorState,
} from "lexical";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { useUpsertMemo } from "@/hooks/memos/useMemos";
import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// Memo 데이터 타입 정의
export interface MemoData {
  id: string;
  text: string;
  created_at: string;
  updated_at?: string;
}

const getInitialConfig = (readOnly: boolean = false) => ({
  namespace: "MyEditor",
  editable: !readOnly,
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
});

function Editor({
  memoData,
  isLoading,
  readOnly = false,
}: {
  memoData: MemoData | null;
  isLoading: boolean;
  readOnly?: boolean;
}) {
  const [editor] = useLexicalComposerContext();

  // 마지막으로 로드된 데이터를 추적
  const lastLoadedDataRef = useRef<string | null>(null);

  // 초기 데이터 로드 - memoData가 실제로 변경될 때만 초기화
  useEffect(() => {
    if (!isLoading && memoData !== undefined) {
      const currentText = memoData?.text || "";

      // 이전에 로드된 데이터와 다를 때만 업데이트
      if (lastLoadedDataRef.current !== currentText) {
        editor.update(() => {
          const root = $getRoot();
          root.clear();

          if (currentText) {
            // 간단한 텍스트 노드로 설정
            const paragraph = $createParagraphNode();
            const textNode = $createTextNode(currentText);
            paragraph.append(textNode);
            root.append(paragraph);
          }
        });
        lastLoadedDataRef.current = currentText;
      }
    }
  }, [memoData, editor, isLoading]);

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

export default function LexicalEditor({
  memoData,
  isLoading,
  readOnly = false,
}: {
  memoData: MemoData | null;
  isLoading: boolean;
  readOnly?: boolean;
}) {
  const { mutate: upsertMemo } = useUpsertMemo();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (editorState: EditorState) => {
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
    <div className="w-[35%] h-full bg-[#2B2D32] border-r-2 border-gray-500 py-6 px-2 sm:px-4">
      <LexicalComposer initialConfig={getInitialConfig(readOnly)}>
        <Editor memoData={memoData} isLoading={isLoading} readOnly={readOnly} />
        {!readOnly && (
          <>
            <HistoryPlugin />
            <ListPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={handleChange} />
          </>
        )}
      </LexicalComposer>
    </div>
  );
}
