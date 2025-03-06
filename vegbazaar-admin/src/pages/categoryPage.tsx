import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryModal from "./categoryModel";
import Sidebar from "../components/Sidebar";

interface Category {
  _id?: string;
  name: string;
  description?: string;
  slug: string;
  image?: string;
  status: "active" | "inactive" | "Coming Soon";
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:4007/cms/category";

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setCategories(response.data?.categories || []);
    } catch (error) {
      toast.error("Failed to fetch categories!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCategories(categories?.filter((category) => category?._id !== id) || []);
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category!");
    }
  };

  const handleSave = async (category: Category) => {
    try {
      if (category?._id) {
        await axios.put(`${API_URL}/${category._id}`, category);
        setCategories(
          categories?.map((c) => (c?._id === category._id ? category : c)) || []
        );
        toast.success("Category updated successfully!");
      } else {
        const response = await axios.post(API_URL, category);
        setCategories([...categories, response.data]);
        toast.success("Category added successfully!");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save category!");
    }
  };

  const filteredCategories = categories?.filter((category) =>
    category?.name?.toLowerCase()?.includes(search?.toLowerCase() || "")
  );

  return (
     <div className="flex ">
          {/* Sidebar */}
          <Sidebar />
    <div className="p-6 w-full">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Categories..."
          className="p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target?.value || "")}
        />
        <button
          onClick={() => {
            setSelectedCategory(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading categories...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories?.map((category) => (
                <tr key={category?._id} className="border-t">
                  <td className="p-3">
                    {category?.image ? (
                      <img
                        src={category?.image}
                        alt={category?.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-3">{category?.name}</td>
                  <td className="p-3">{category?.slug}</td>
                  <td className="p-3">{category?.status}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(category?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        category={selectedCategory}
        onSave={handleSave}
      />
    </div>
    </div>
  );
};

export default CategoryPage;
