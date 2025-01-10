export default function Overview({ card, isNewCard }) {
  if (isNewCard) {
    return (
      // Render new card form
      <div>
        {/* Your new card form components */}
      </div>
    );
  }

  return (
    // Render existing card details
    <div>
      {/* Your existing card details */}
    </div>
  );
};