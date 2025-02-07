export default function transformBlogStatus(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
}
