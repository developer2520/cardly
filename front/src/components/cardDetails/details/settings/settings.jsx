import React, { useContext } from "react";
import { OwnCardsContext } from "./../../../../context/ownCardsContext";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Trash2 } from "lucide-react";
import { toast } from "sonner"; // Import Sonner
import "./settings.css"; // Import your styles
import  supabase  from "./../../../../../supabaseClient"; // Assuming you have Supabase client initialized

const Settings = ({ card, setSelectedCard }) => {
  const { refetch } = useContext(OwnCardsContext);

  const handleDelete = async () => {
    try {
      // Delete the card from the database
      await axios.delete(`/cards/cards/${card._id}`);

      // Delete the image from Supabase storage
      const imagePath = card.imageUrl.split('/').pop(); // Extract the image file name from the URL
      const { error } = await supabase.storage
        .from('images') // Replace 'images' with your Supabase bucket name
        .remove([imagePath]);

      if (error) {
        console.error("Error deleting image:", error.message);
        toast.error(`Failed to delete image ❌ ${error.message}`);
      } else {
        toast.success("Image deleted successfully! 🎉");
      }

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
