import React from "react";

// This is a placeholder component, made to test the handleClick function in the card component
const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <h1>Product Details for ID: {id}</h1>
      {/* Render other product details here using the ID */}
    </div>
  );
};

export default ProductPage;
