import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images?: string;
  status: "active" | "inactive" | "discontinued";
  type_quantity: "Gram" | "Kilogram" | "Piece" | "Milliliter" | "Liter";
  discount: number;
  stock: number;
}

const ProductModal = ({
  isOpen,
  setIsOpen,
  product,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  product?: Product;
}) => {
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    images: "",
    status: "active",
    type_quantity: "Kilogram",
    discount: 0,
    stock: 10,
  });

  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    if (product) {
      setForm(product);
      setFile(product.images ? new File([], product.images) : null);
    }
  }, [product]);

  // Fetch categories when the modal opens
  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:4007/cms/category")
        .then((response) => {
          setCategories(response.data.categories || []);
        })
        .catch(() => {
          toast.error("Failed to load categories.");
        });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("status", form.status);
    formData.append("discount", form.discount.toString());
    formData.append("price", form.price.toString());
    formData.append("type_quantity", form.type_quantity);
    formData.append("stock", form.stock.toString());

    if (file) {
      formData.append("image", file);
    }

    try {
      if (product?._id) {
        // **EDIT PRODUCT (PUT request)**
        await axios.put(`http://localhost:4007/cms/products/${product._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully!");
      } else {
        // **ADD PRODUCT (POST request)**
        await axios.post("http://localhost:4007/cms/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added successfully!");
      }

      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to save product.");
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setForm({ ...form, images: URL.createObjectURL(acceptedFiles[0]) });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            name="discount"
            type="number"
            placeholder="Discount (%)"
            value={form.discount}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full md:col-span-2 h-24"
          ></textarea>

          <div {...getRootProps()} className="border px-3 py-2 rounded-md text-center cursor-pointer w-full md:col-span-2">
            <input {...getInputProps()} />
            {file ? (
              <img src={form.images} alt="Preview" className="w-full h-auto mt-2 rounded-md" />
            ) : (
              <p>Drag & drop an image here, or click to select one</p>
            )}
          </div>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="discontinued">Discontinued</option>
          </select>

          <select
            name="type_quantity"
            value={form.type_quantity}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="Gram">Gram</option>
            <option value="Kilogram">Kilogram</option>
            <option value="Piece">Piece</option>
            <option value="Milliliter">Milliliter</option>
            <option value="Liter">Liter</option>
          </select>

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded-md">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md">
            {product ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductModal;
