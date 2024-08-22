import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, message } from "antd";
import AddReservation from "./AddReservation";

const RoomDetail = () => {
  const { roomId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/rooms/${roomId}`)
      .then((res) => res.json())
      .then((data) => setReservations(data.reservations || []))
      .catch((error) => console.error("Error:", error));
  }, [roomId]);

  const isDateRangeOverlapping = (newReservation) => {
    const { from: newFrom, to: newTo } = newReservation;

    return reservations.some((reservation) => {
      const { from: existingFrom, to: existingTo } = reservation;
      return (
        (newFrom <= existingTo && newTo >= existingFrom) 
      );
    });
  };

  const handleCreate = (newReservation) => {
    const newReservationData = {
      ...newReservation,
      roomId: parseInt(roomId),
      id: reservations.length + 1,
      from: newReservation.from.format("YYYY-MM-DD"),
      to: newReservation.to.format("YYYY-MM-DD"),
    };

    if (isDateRangeOverlapping(newReservationData)) {
      message.error("Error: Busy.");
      return;
    }

    fetch(`http://localhost:5000/rooms/${roomId}`)
      .then((res) => res.json())
      .then((roomData) => {
        const updatedReservations = [...roomData.reservations, newReservationData];
        
        fetch(`http://localhost:5000/rooms/${roomId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...roomData, reservations: updatedReservations }),
        })
          .then((res) => res.json())
          .then(() => {
            setReservations(updatedReservations);
            setIsModalVisible(false);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => console.error("Error:", error));
  };

  const columns = [
    {
      title: "Reserved By",
      dataIndex: "reservedBy",
      key: "reservedBy",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
  ];

  return (
    <div>
      <h1>Room {roomId} Details</h1>
      <Table dataSource={reservations} columns={columns} rowKey="id" />
      <Button
        type="primary"
        style={{ marginTop: "20px" }}
        onClick={() => setIsModalVisible(true)}
      >
        Add Reservation
      </Button>
      <AddReservation
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default RoomDetail;
