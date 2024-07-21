'use client';

import React, { useEffect, useState } from 'react';
import Button from '../../reusable-components/button/Button';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import Filter from '../SearchAndFilter/Filter';
import Search from '../SearchAndFilter/Search';
import ActionDropdown from '../../reusable-components/reusable-table/ActionDropdown';
import style from './createBlogs.module.scss';

interface BlogPost {
  id: string;
  title: string;
  tags: { name: string }[];
  author: string;
}

const BlogListView = () => {
  const [data, setData] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://staging-api.learnhub.mk/blog-posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const transformedData: BlogPost[] = result.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          tags: item.tags,
          author: `${item.author.first_name} ${item.author.last_name}`,
        }));
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const headers: (keyof BlogPost)[] = ['title', 'author', 'tags'];
  const displayNames = {
    title: 'Title',
    author: 'Author',
    tags: 'Tags',
  };

  const handleView = (id: string) => {
    console.log('View blog', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit blog', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete blog', id);
  };

  const renderActionsDropdown = (item: BlogPost) => (
    <ActionDropdown
      dropdownItems={[
        { id: 'view', label: 'View', onClick: () => handleView(item.id) },
        { id: 'edit', label: 'Edit', onClick: () => handleEdit(item.id) },
        { id: 'delete', label: 'Delete', onClick: () => handleDelete(item.id) },
      ]}
    />
  );

  return (
    <div className={style.mainContainer}>
      <div className={style.inputWrapper}>
        <Search handleInputChange={() => {}} searchValue="Search" />
        <div className={style.rightContainer}>
          <Filter handleRoleChange={() => {}} />
          <Button
            href=""
            type="button"
            buttonText="Add Blog"
            buttonClass={['primaryButton']}
            moveIcon
          />
        </div>
      </div>
      <ReusableTable
        headers={headers}
        displayNames={displayNames}
        data={data}
        renderActionsDropdown={renderActionsDropdown}
      />
    </div>
  );
};

export default BlogListView;
