export default function AppointmentFormModal({
  isOpen,
  mode,
  formData,
  physicians,
  statusOptions,
  typeOptions,
  error,
  onChange,
  onSubmit,
  onClose,
  onDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === "edit" ? "Edit Appointment" : "Create Appointment"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label className="form-label">Patient Name</label>
                <input
                  type="text"
                  name="patient_name"
                  className="form-control"
                  value={formData.patient_name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Physician</label>
                <select
                  name="doctor_name"
                  className="form-select"
                  value={formData.doctor_name}
                  onChange={onChange}
                  required
                >
                  <option value="">Select a physician</option>
                  {physicians.map((physician) => (
                    <option key={physician.id} value={physician.name}>
                      {physician.title
                        ? `${physician.title.toUpperCase()} ${physician.name}`
                        : physician.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Appointment Time</label>
                <input
                  type="datetime-local"
                  name="appointment_time"
                  className="form-control"
                  value={formData.appointment_time}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Visit Type</label>
                <select
                  name="appointment_type"
                  className="form-select"
                  value={formData.appointment_type}
                  onChange={onChange}
                  required
                >
                  <option value="">Select visit type</option>
                  {typeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={onChange}
                  required
                >
                  <option value="">Select status</option>
                  {statusOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Reason</label>
                <textarea
                  name="reason"
                  className="form-control"
                  value={formData.reason}
                  onChange={onChange}
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              {mode === "edit" && (
                <button
                  type="button"
                  className="btn btn-danger me-auto"
                  onClick={onDelete}
                >
                  Delete
                </button>
              )}

              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                {mode === "edit" ? "Save Changes" : "Create Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}