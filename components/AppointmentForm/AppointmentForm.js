import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AppointmentForm.css"; 

function AppointmentForm() {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        isFirstTime: "",
        appointmentDate: null,
        appointmentTime: "",
        email: "",
        department: "",
        reason: "",
    });

    const timeSlots = [];
    for (let hour = 9; hour < 17; hour++) {
        if (hour !== 13) {
            timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, appointmentDate: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form Submitted: " + JSON.stringify(formData));
    };

    return (
        <form onSubmit={handleSubmit} className="appointment-form">
            {/* Patient Information */}
            <h2 className="form-header">Patient Information</h2>

            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>

            <div className="row">
                <label>
                    Date of Birth:
                    <input
                        type="text"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                        required
                    />
                </label>

                <label>
                    Is this your first time?
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="isFirstTime"
                                value="yes"
                                checked={formData.isFirstTime === "yes"}
                                onChange={handleChange}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="isFirstTime"
                                value="no"
                                checked={formData.isFirstTime === "no"}
                                onChange={handleChange}
                            />
                            No
                        </label>
                    </div>
                </label>
            </div>

            {/* Book An Appointment */}
            <h2 className="form-header">Book An Appointment</h2>

            <div className="row">
                <label>
                    Date:
                    <DatePicker
                        selected={formData.appointmentDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Click to select a date"
                        required
                    />
                </label>

                <label>
                    Time:
                    <select
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select a time slot
                        </option>
                        {timeSlots.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>

            <label>
                Choose Department:
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                        Select Department
                    </option>
                    <option value="general">General Medicine</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="pediatrics">Pediatrics</option>
                </select>
            </label>

            <label>
                Describe a Reason for Visit:
                <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Enter reason"
                    required
                />
            </label>

            <button type="submit" className="submit-button">
                Submit
            </button>
        </form>
    );
}

export default AppointmentForm;
