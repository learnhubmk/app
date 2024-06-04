import React, { useState, useEffect } from 'react';
import submitSearchForm from './SubmitSearchForm';
import style from './displayNames.module.scss';

interface Author {
  first_name: string;
  last_name: string;
}

interface Post {
  author: Author;
}

interface DisplayNamesProps {
  filterValue: string;
}

const DisplayNames: React.FC<DisplayNamesProps> = ({ filterValue }) => {
  const [names, setNames] = useState<{ firstName: string; lastName: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await submitSearchForm();
        const filteredNames = response.data
          .filter(
            (post: Post) =>
              post.author.first_name.toLowerCase().includes(filterValue.toLowerCase()) ||
              post.author.last_name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((post: Post) => ({
            firstName: post.author.first_name,
            lastName: post.author.last_name,
          }));
        setNames(filteredNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterValue]);

  return (
    <div className={style.displayNames}>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {names.map((name) => (
              <tr>
                <td>{name.firstName}</td>
                <td>{name.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayNames;
