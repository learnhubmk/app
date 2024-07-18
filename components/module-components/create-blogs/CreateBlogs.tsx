'use client';

import React, { useEffect, useState } from 'react';
import Button from '../../reusable-components/button/Button';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import Filter from '../SearchAndFilter/Filter';
import Search from '../SearchAndFilter/Search';
import style from './createBlogs.module.scss';

interface BlogPost {
  id: string;
  title: string;
  tags: { name: string }[];
  author: string;
}

const CreateBlogs = () => {
  const [data, setData] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://staging-api.learnhub.mk/blog-posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          const transformedData: BlogPost[] = result.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            tags: item.tags,
            author: `${item.author.first_name} ${item.author.last_name}`,
          }));
          setData(transformedData);
        }
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

  return (
    <div className={style.mainContainer}>
      <div className={style.inputWrapper}>
        <Search handleInputChange={() => {}} searchValue="Search" />
        <div className={style.rightContainer}>
          <Filter handleRoleChange={() => {}} />
          <Button
            href=""
            type="button"
            buttonText="Search"
            buttonClass={['primaryButton']}
            moveIcon
          />
        </div>
      </div>
      <ReusableTable headers={headers} displayNames={displayNames} data={data} />
    </div>
  );
};

export default CreateBlogs;
