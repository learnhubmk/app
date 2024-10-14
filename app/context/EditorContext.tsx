'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface EditorState {
  isEditable: boolean;
}

interface EditorContextType {
  editorState: EditorState;
  editorStateChange: (newState: EditorState) => void;
  resetEditorState: () => void;
}

const initialState: EditorState = {
  isEditable: false,
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editorState, setEditorState] = useState<EditorState>(initialState);

  const editorStateChange = useCallback((newState: EditorState) => {
    setEditorState(newState);
  }, []);

  const resetEditorState = useCallback(() => {
    setEditorState(initialState);
  }, []);

  const contextValue = useMemo(
    () => ({
      editorState,
      editorStateChange,
      resetEditorState,
    }),
    [editorState, editorStateChange, resetEditorState]
  );

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>;
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
