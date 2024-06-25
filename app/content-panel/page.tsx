'use client';

import { useState } from 'react';
import Button from '../../components/reusable-components/button/Button';

const ContentPanel = () => {
  const [activeTab, setActiveTab] = useState('blogs');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Content Panel</h1>
      <div>
        <Button
          href=""
          type="button"
          buttonClass={['primaryButton']}
          buttonText="Blogs"
          onClick={() => handleTabClick('blogs')}
        />
        <Button
          href=""
          type="button"
          buttonClass={['primaryButton']}
          buttonText="Tags"
          onClick={() => handleTabClick('tags')}
        />
      </div>
      <div>
        {activeTab === 'blogs' && (
          <div>
            <h2>Blogs Section</h2>
          </div>
        )}
        {activeTab === 'tags' && (
          <div>
            <h2>Tags Section</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPanel;
