import LogoutButton from '../../components/reusable-components/button/LogoutButton';

const AdminDashboardPage = () => {
  return (
    <div>
      AdminDashboardPage <LogoutButton redirectUrl="/admin-panel/login" />
    </div>
  );
};

export default AdminDashboardPage;
