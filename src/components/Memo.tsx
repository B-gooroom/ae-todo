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
  const isInitializingRef = useRef<boolean>(false);
  const hasInitializedRef = useRef<boolean>(false);

  // 초기 데이터 로드 - 한 번만 초기화
  useEffect(() => {
    if (!isLoading && memoData !== undefined && !hasInitializedRef.current) {
      const currentText = memoData?.text || "";

      isInitializingRef.current = true;
      hasInitializedRef.current = true;

      editor.update(() => {
        const root = $getRoot();
        root.clear();

        if (currentText) {
          // 일반 텍스트로 로드 (마크다운 파싱은 단축키로만 지원)
          const paragraph = $createParagraphNode();
          const textNode = $createTextNode(currentText);
          paragraph.append(textNode);
          root.append(paragraph);
        }
      });

      isInitializingRef.current = false;
      lastLoadedDataRef.current = currentText;
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
          <ContentEditable
            className={`min-h-screen p-2 outline-none text-sm ${
              readOnly ? "text-gray-300 cursor-default" : "text-gray-300"
            }`}
            // placeholder="메모를 작성하세요... (마크다운 지원: # 제목, **굵게**, *기울임*, - 목록)"
          />
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

  return (
    <div className="w-[35%] h-full bg-[#2B2D32] border-r-2 border-gray-500 py-6 px-2 sm:px-4">
      <LexicalComposer initialConfig={getInitialConfig(readOnly)}>
        <Editor memoData={memoData} isLoading={isLoading} readOnly={readOnly} />
        {!readOnly && (
          <ChangeHandler
            upsertMemo={upsertMemo}
            debounceTimeoutRef={debounceTimeoutRef}
          />
        )}
      </LexicalComposer>
    </div>
  );
}

function ChangeHandler({
  upsertMemo,
  debounceTimeoutRef,
}: {
  upsertMemo: (content: string) => void;
  debounceTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}) {
  const [editor] = useLexicalComposerContext();

  const handleChange = () => {
    // 디바운스 처리 (1초 후에 저장)
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      // 에디터 상태를 읽어서 저장
      editor.read(() => {
        const root = $getRoot();
        const content = root.getTextContent();
        // 빈 내용이거나 의미있는 변경이 있을 때만 저장
        if (content.trim() !== "") {
          upsertMemo(content);
        }
      });
    }, 1000);
  };

  return (
    <>
      <HistoryPlugin />
      <ListPlugin />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <OnChangePlugin onChange={handleChange} />
    </>
  );
}
