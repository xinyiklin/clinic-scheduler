import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const API_URL = "/api/appointments/";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); // Tracks ID of appointment being edited

  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
    appointment_time: "",
    reason: "",
    status: "pending",
  });

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(API_URL, {
        withCredentials: true,
      });
      setAppointments(res.data);
      setError("");
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
      };

      await axios.post(API_URL, payload, {
        withCredentials: true,
      });

      setFormData({
        patient_name: "",
        doctor_name: "",
        appointment_time: "",
        reason: "",
        status: "pending",
      });

      fetchAppointments();
      setError("");
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Operation failed.");
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this appointment?")) return;

  try {
    await axios.delete(`${API_URL}${id}/`, { withCredentials: true });
    fetchAppointments(); // Refresh the list
  } catch (err) {
    setError("Failed to delete appointment.");
  }
};

  return (
    <div className="container py-4">
      <h1 className="mb-4">Clinic Scheduler</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Create Appointment</h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Patient Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Doctor Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="doctor_name"
                  value={formData.doctor_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Appointment Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="check_in">Check In</option>
                  <option value="check_out">Check Out</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no_show">No Show</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Reason</label>
                <textarea
                  className="form-control"
                  name="reason"
                  rows="3"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Create Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <h2 className="h4 mb-3">Appointments</h2>

      {loading && <p>Loading appointments...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && appointments.length === 0 && (
        <p>No appointments found.</p>
      )}

      <div className="row g-3">
        {appointments.map((a) => (
          <div className="col-md-6" key={a.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5 card-title">{a.patient_name}</h3>
                <p className="mb-1"><strong>Doctor:</strong> {a.doctor_name}</p>
                <p className="mb-1"><strong>Time:</strong> {a.appointment_time}</p>
                <p className="mb-1"><strong>Status:</strong> {a.status}</p>
                <p className="mb-1"><strong>Reason:</strong> {a.reason || ""}</p>
                <p className="mb-0"><strong>Created By:</strong> {a.created_by_name || "Unknown"}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;