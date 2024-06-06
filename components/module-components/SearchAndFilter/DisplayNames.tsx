import React, { useState, useEffect } from 'react';
import submitSearchForm from './SubmitSearchForm';
import style from './displayNames.module.scss';
import { UserRole } from './Filter';

interface Author {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface DisplayNamesProps {
  filterValue: string;
  selectedRoles: UserRole[];
}

const DisplayNames = ({ filterValue, selectedRoles }: DisplayNamesProps) => {
  const [names, setNames] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await submitSearchForm();
        const filteredNames = response.filter((author: Author) => {
          const fullName = `${author.first_name} ${author.last_name}`.toLowerCase();
          return (
            fullName.includes(filterValue.toLowerCase()) &&
            selectedRoles.includes(author.role as UserRole)
          );
        });
        setNames(filteredNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterValue, selectedRoles]);

  return (
    <div className={style.displayNames}>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {names.map((name) => (
              <tr key={name.id}>
                <td>{name.first_name}</td>
                <td>{name.last_name}</td>
                <td>{name.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayNames;
