import LogoutButton from '../../components/reusable-components/button/LogoutButton';

const AdminDashboardPage = () => {
  return (
    <div>
      AdminDashboardPage <LogoutButton redirectUrl="/admin-dashboard/login" />
    </div>
  );
};

export default AdminDashboardPage;
