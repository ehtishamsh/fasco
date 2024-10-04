import { Button } from "@/components/ui/button";

const Bulk = ({ ProductsInBulk }: any) => {
  console.log(ProductsInBulk);
  const uploadProducts = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      for (const product of ProductsInBulk) {
        const res = await fetch(
          "https://fascobackend-production.up.railway.app/api/products/new",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );

        const data = await res.json();
        if (data) {
          console.log(`Product added successfully: ${product.title}`);
        }

        // Wait for 5 seconds before the next iteration
        await delay(5000);
      }

      // Optionally, show a toast or notification for batch upload success
      console.log("All products uploaded successfully!");
    } catch (error) {
      console.error("Error uploading products:", error);
    }
  };

  return (
    <div>
      <Button onClick={uploadProducts}>Upload Products</Button>
    </div>
  );
};

export default Bulk;
