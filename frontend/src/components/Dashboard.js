import { useEffect } from "react";
import Header from "./header";
import axios from "axios";
import SensorCard from "./Card";
import Card from "react-bootstrap/Card";

const Dashboard = ({ user, handleLogout, sensors, setSensors }) => {
  const getAllSensors = async () => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_BASE}/api/v1/sensors`,
      headers,
    });

    setSensors(response.data);
  };

  useEffect(() => {
    getAllSensors();
  }, []);

  const handleToggleSensor = async (id, isActivated) => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_URL_BASE}/api/v1/sensors/${id}`,
      data: {
        isActivated: isActivated,
      },
      headers,
    });
  };

  const handleRemoveSensor = async (id) => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_BASE}/api/v1/sensors/${id}`,
      headers,
    });
  };

  const ActiveSensors = sensors.reduce(
    (sum, item) => (item.isActivated ? sum + 1 : sum),
    0
  );
  const notActiveSensorsCounter = sensors.length - ActiveSensors;

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />

      <div className="d-flex justify-content-center">
        <Card
          className="p-5 border border-secondary ml-3 mt-3 h-2 d-flex justify-content-center"
          style={{ width: "70rem" }}
        >
          <section>
            <h2 className="activeSensorsHeader">Sensors status</h2>
            <div className="activeSensorsCardsWrapper">
              <div className="activeSensorsCard">
                Active sensors: {ActiveSensors}
              </div>
              <div className="activeSensorsCard">
                Inactive sensors: {notActiveSensorsCounter}
              </div>
            </div>
          </section>

          <section className="dashboardWrapper">
            <h2>Available Sensors</h2>
            <div className="sensorsListWrapper">
              {sensors.map((sensor) => (
                <SensorCard
                  key={sensor._id}
                  sensor={sensor}
                  handleToggleSensor={handleToggleSensor}
                  handleRemoveSensor={handleRemoveSensor}
                />
              ))}
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
