import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { editorState } from '../_Types';

const initialState: editorState = {
  isEditable: false,
};

export const editorSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    editorStateChange: (state: editorState, action: PayloadAction<editorState>) => {
      state.isEditable = action.payload.isEditable;
    },
    reseteditorState: () => initialState,
  },
});

export const { editorStateChange, reseteditorState } = editorSlice.actions;
