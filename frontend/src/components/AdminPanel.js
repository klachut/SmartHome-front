import Header from "./header";
import AddSensorsForm from "./AddSensorForm";

const AdminPanel = ({ user, handleLogout, setSensors }) => {
  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <AddSensorsForm setSensors={setSensors} user={user} />
    </div>
  );
};

export default AdminPanel;
