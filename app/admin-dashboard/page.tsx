import AddMemberForm from '../../components/module-components/admin/AddMemberForm';
import LogoutButton from '../../components/reusable-components/button/LogoutButton';

const AdminDashboardPage = () => {
  return (
    <div>
      AdminDashboardPage <LogoutButton redirectUrl="/admin-dashboard/login" />
      <AddMemberForm />
    </div>
  );
};

export default AdminDashboardPage;
