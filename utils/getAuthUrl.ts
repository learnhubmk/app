import { Role } from '../app/context/authContext';

export default function getAuthUrl(baseUrl: string, role: Role): string {
  let url = baseUrl;
  if (role === 'member') url = `${baseUrl}`;
  else if (role === 'content_manager') url = `${baseUrl}/content`;
  else if (role === 'admin') url = `${baseUrl}/admin`;
  return url;
}
