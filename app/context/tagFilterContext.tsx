'use client';

import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

type TagFilterContextType = {
  selectedTags: string[];
  // eslint-disable-next-line no-unused-vars
  toggleTag: (tag: string) => void;
};

const TagFilterContext = createContext<TagFilterContextType | undefined>(undefined);

export const useTagFilterContext = () => {
  const context = useContext(TagFilterContext);
  if (!context) {
    throw new Error('useTagFilterContext must be used within a TagFilterProvider');
  }
  return context;
};

interface TagFilterProviderProps {
  children: ReactNode;
}

export const TagFilterProvider: FC<TagFilterProviderProps> = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = useCallback(
    (tag: string) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    },
    [selectedTags]
  );

  const contextValue: TagFilterContextType = useMemo(
    () => ({
      selectedTags,
      toggleTag,
    }),
    [selectedTags, toggleTag]
  );

  return <TagFilterContext.Provider value={contextValue}>{children}</TagFilterContext.Provider>;
};
