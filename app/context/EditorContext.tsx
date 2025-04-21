'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

interface EditorState {
  isEditable: boolean;
  pagination?: {
    paginationPage: number;
  };
}

interface EditorContextType {
  editorState: EditorState;
  editorStateChange: (newState: EditorState) => void;
  resetEditorState: () => void;
}

const initialState: EditorState = {
  isEditable: false,
  pagination: {
    paginationPage: 1,
  },
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editorState, setEditorState] = useState<EditorState>(initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPaginationPage = localStorage.getItem('paginationPage');
      if (storedPaginationPage) {
        setEditorState((previousState) => ({
          ...previousState,
          pagination: {
            paginationPage: parseInt(storedPaginationPage, 10),
          },
        }));
      }
    }
  }, []);

  const editorStateChange = useCallback((newState: Partial<EditorState>) => {
    setEditorState((previousState) => {
      const updatedState = {
        ...previousState,
        ...newState,
        pagination: newState.pagination
          ? { ...previousState.pagination, ...newState.pagination }
          : previousState.pagination,
      };

      if (updatedState.pagination) {
        localStorage.setItem('paginationPage', updatedState.pagination.paginationPage.toString());
      }

      return updatedState;
    });
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
