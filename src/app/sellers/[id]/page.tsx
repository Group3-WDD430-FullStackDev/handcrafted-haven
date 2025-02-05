import React from "react";

// This is a placeholder component, made to test the handleClick function in the card component
const SellerPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
      <h1>Seller Profile for ID: {id}</h1>
      {/* Render other seller details here using the ID */}
    </div>
  );
};

export default SellerPage;
