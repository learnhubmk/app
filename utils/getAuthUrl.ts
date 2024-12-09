import { Role } from '../Types';

export default function getAuthUrl(baseUrl: string, role: Role): string {
  let url = baseUrl;
  if (role === 'member') url = `${baseUrl}`;
  else if (role === 'content_manager' || role === 'content') url = `${baseUrl}/content`;
  else if (role === 'admin') url = `${baseUrl}/admin`;
  return url;
}
