import { useState, useEffect } from "react";
import axios from "axios";
import ProductModal from "./ProductModal";
import Button from "../components/Button";
import Input from "../components/Input";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

interface Product {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: { _id: string; name: string };
  images?: string;
  status?: "active" | "inactive" | "discontinued";
  type_quantity?: "Gram" | "Kilogram" | "Piece" | "Milliliter" | "Liter";
  discount?: number;
  stock?: number;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:4007/cms/products";

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data?.products || []);
    } catch (error) {
      toast.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Delete Product
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products?.filter((product) => product?._id !== id) || []);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product!");
    }
  };

  // Handle Add / Update Product
  const handleSave = async (product: Product) => {
    try {
      if (product?._id) {
        await axios.put(`${API_URL}/${product._id}`, product);
        setProducts(
          products?.map((p) => (p?._id === product._id ? product : p)) || []
        );
        toast.success("Product updated successfully!");
      } else {
        const response = await axios.post(API_URL, product);
        setProducts([...products, response.data]);
        toast.success("Product added successfully!");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save product!");
    }
  };

  const filteredProducts = products?.filter((product) =>
    product?.name?.toLowerCase()?.includes(search?.toLowerCase() || "")
  );

  return (
    <div className="flex ">
          {/* Sidebar */}
          <Sidebar />
    <div className="p-6 w-full">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target?.value || "")}
        />
        <Button onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}>
          Add Product
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((product) => (
                <tr key={product?._id} className="border-t">
                  <td className="p-3">
                    {product?.images ? (
                      <img
                        src={product?.images}
                        alt={product?.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-3">{product?.name}</td>
                  <td className="p-3">₹{product?.price}</td>
                  <td className="p-3">{product?.category?.name}</td>
                  <td className="p-3">{product?.stock}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-bold ${
                        product?.status === "active" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product?.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product?._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          product={selectedProduct}
          onSave={handleSave}
        />
      )}
    </div>
    </div>
  );
};

export default ProductPage;
