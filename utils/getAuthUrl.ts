import { UserRole } from '../Types';

export default function getAuthUrl(baseUrl: string, role: UserRole): string {
  let url = baseUrl;
  if (role === UserRole.member) url = `${baseUrl}`;
  else if (role === UserRole.content_manager) url = `${baseUrl}/content`;
  else if (role === UserRole.admin) url = `${baseUrl}/admin`;
  return url;
}
