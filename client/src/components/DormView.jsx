import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// Moved modal component outside to prevent re-creation on every render
function ConfirmBooking({
  roomNumber,
  holderName,
  phone,
  setHolderName,
  setPhone,
  BookTheRoom,
  setBookingStatus,
}) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-20 z-10 pointer-events-auto"></div>

      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
        <div className="bg-white shadow-lg p-6 rounded-lg w-96">
          <p className="mb-4 text-lg font-semibold">
            Do you want to book Room no {roomNumber}?
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              BookTheRoom(roomNumber);
            }}
          >
            <input
              type="text"
              placeholder="Your name"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Book
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setBookingStatus(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function DormView() {
  const { dormName } = useParams();
  const [rooms, setRooms] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(false);
  const [roomNumber, setRoomNumber] = useState(null);
  const [holderName, setHolderName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get(`https://temple-project-server-3oc3.onrender.com/rooms/${dormName}`)
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.error("Error ---> " + err.message));
  }, [dormName]);

  const handleBook = async (roomNumber) => {
    setRoomNumber(roomNumber);
    localStorage.setItem("roomNumber", roomNumber);
    setBookingStatus(true);
  };

  const BookTheRoom = async (roomNumber) => {
    if (!holderName || !phone) {
      alert("Please fill out all fields.");
      return;
    }

    const cur_date = Date.now();
    await axios
      .post(`https://temple-project-server-3oc3.onrender.com/rooms/books`, {
        dormitory: dormName,
        roomNumber: roomNumber,
        holderName: holderName,
        Date: cur_date,
        phoneNumber: phone,
      })
      .then(() => {
        const updatedRooms = rooms.map((room) =>
          room.roomNumber === roomNumber ? { ...room, isBooked: true } : room
        );
        setRooms(updatedRooms);
        setBookingStatus(false);
        setHolderName("");
        setPhone("");
      })
      .catch((err) => console.error("Booking failed", err));
  };

  return (
    <div className="relative min-h-screen p-6">
      {/* Modal */}
      {bookingStatus && (
        <ConfirmBooking
          roomNumber={roomNumber}
          holderName={holderName}
          phone={phone}
          setHolderName={setHolderName}
          setPhone={setPhone}
          BookTheRoom={BookTheRoom}
          setBookingStatus={setBookingStatus}
        />
      )}

      {/* Room List */}
      <h2 className="text-xl font-bold mb-4">Rooms in {dormName}</h2>
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-4 w-max">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                key={room.roomNumber}
                className={`min-w-[200px] flex-shrink-0 p-4 border rounded ${
                  room.isBooked ? "bg-red-200" : "bg-green-100"
                }`}
              >
                <h3 className="text-lg font-semibold">
                  Room {room.roomNumber}
                </h3>
                <p>Status: {room.isBooked ? "Booked" : "Available"}</p>
                {!room.isBooked && (
                  <button
                    className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleBook(room.roomNumber)}
                  >
                    Book Now
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>Loading rooms...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DormView;
