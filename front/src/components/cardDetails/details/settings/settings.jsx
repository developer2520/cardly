import React, { useContext } from "react";
import { OwnCardsContext } from "./../../../../context/ownCardsContext";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Trash2 } from "lucide-react";
import { toast } from "sonner"; // Import Sonner
import "./settings.css"; // Import your styles

const Settings = ({ card, setSelectedCard }) => {
  const { refetch } = useContext(OwnCardsContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`/cards/${card._id}`);
      toast.success("Card deleted successfully! 🎉"); // Sonner toast for success
      setSelectedCard(null);
      refetch();
    } catch (err) {
      console.error("Error deleting card:", err.message);
      const errorMessage = err.response?.data?.message || err.message || "Something went wrong!";
      toast.error(`Failed to delete card ❌ ${errorMessage}`); // Sonner toast for error
    }
  };

  const showConfirmDialog = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3086d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(); // Proceed with deletion if confirmed
      }
    });
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Manage Your Card</h2>
      <p className="settings-description">You can delete your card here. Be careful, this action cannot be undone.</p>
      <div className="actions">
        <button className="delete-button" onClick={showConfirmDialog}>
          <Trash2 className="icon" />
          Delete Card
        </button>
      </div>
    </div>
  );
};

export default Settings;
