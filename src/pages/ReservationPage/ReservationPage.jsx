import React, { useState } from "react";
// import keycloak from '../../keycloak'; // Assuming this is your Keycloak instance
const VITE_RESERVATION_API_URL = import.meta.env.VITE_RESERVATION_API_URL;
const ReservationForm = (userId, restaurantId) => {
    
  const [formData, setFormData] = useState({
    numOfPeople: 1,
    slot: "",
    requestType: "RESERVE",
  });
  const [message, setMessage] = useState("");
  console.log(userId,'userId');
  console.log(restaurantId,'restaurantId');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
    // const user = keycloak.tokenParsed;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${VITE_RESERVATION_API_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId.userId,
            restaurantId: userId.restaurantId,
            numOfPeople: parseInt(formData.numOfPeople),
            slot: formData.slot,
            requestType: formData.requestType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit reservation request.");
      }

      const data = await response.text();
      setMessage(
        `Reservation ${formData.requestType === "RESERVE" ? "made" : "cancelled"} successfully!`
      );
    } catch (error) {
       
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Make a Reservation</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Number of People:</label>
          <input
            type="number"
            name="numOfPeople"
            value={formData.numOfPeople}
            onChange={handleInputChange}
            min="1"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Reservation Slot:</label>
          <input
            type="datetime-local"
            name="slot"
            value={formData.slot}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Request Type:</label>
          <select
            name="requestType"
            value={formData.requestType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="RESERVE">Reserve</option>
            <option value="CANCEL">Cancel</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {formData.requestType === "RESERVE" ? "Reserve" : "Cancel"}
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
