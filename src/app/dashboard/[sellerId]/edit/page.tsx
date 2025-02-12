import { fetchSellerData } from "@/app/lib/sellers/queries"; // Adjust based on your project structure
import EditSellerForm from "@/components/SellerDashboard/edit-seller";
import NotFoundPage from "@/components/Common/NotFound";

const EditSellerPage = async ({
  params,
}: {
  params: Promise<{ sellerId: string }>;
}) => {
  const { sellerId } = await params;
  //   const user_id = Number(params.user_id);

  // Fetch user data from the database
  const sellerData = await fetchSellerData(+sellerId);

  if (!sellerData || sellerData.user_is_seller === false) {
    return <NotFoundPage errorMessage="Seller not found" />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Your Profile</h1>
      <EditSellerForm
        sellerId={sellerData.user_id}
        displayName={sellerData.displayName}
        bio={sellerData.user_bio}
        image={sellerData.image}
      />
    </div>
  );
};

export default EditSellerPage;
