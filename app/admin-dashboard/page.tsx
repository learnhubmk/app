import ReusableModal from '../../components/reusable-components/reusable-modal/ReusableModal';

const AdminDashboard = () => {
  return (
    <div>
      <ReusableModal title="Delete user?" description="Do you want to delete this user?" />
    </div>
  );
};

export default AdminDashboard;
