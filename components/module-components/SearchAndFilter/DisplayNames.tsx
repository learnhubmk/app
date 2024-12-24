import React, { useState, useEffect } from 'react';
import fetchSearchResultsFromApi from './SubmitSearchForm';
import style from './displayNames.module.scss';
import Loading from '../../../app/loading';
import { UserRole } from '../../../Types';

interface Author {
  id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

interface DisplayNamesProps {
  filterValue: string;
  selectedRoles: UserRole[];
}

const DisplayNames = ({ filterValue, selectedRoles }: DisplayNamesProps) => {
  const [names, setNames] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchSearchResultsFromApi();
        const filteredNames = response.filter((author: Author) => {
          const fullName = `${author.first_name} ${author.last_name}`.toLowerCase();
          return (
            fullName.includes(filterValue.toLowerCase()) &&
            selectedRoles.includes(author.role as UserRole)
          );
        });
        setNames(filteredNames);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterValue, selectedRoles]);

  return (
    <div className={style.displayNames}>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
};

export default DisplayNames;
