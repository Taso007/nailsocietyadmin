import React from "react";
import "./deletePopup.css";

function DeletePopUp({ handleDelete, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="modal-content">
        <h2>Delete Confirmation</h2>
        <p className="confirmation-message">
          Are you sure you want to delete this item?
        </p>

        <div className="button-container">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-button" onClick={() => {
            handleDelete();
            onClose();
          }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
