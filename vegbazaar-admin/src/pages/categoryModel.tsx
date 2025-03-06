import { useState } from "react";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";

interface Category {
  _id?: string;
  name?: string;
  description?: string;
  slug?: string;
  image?: File | null;
  status?: "active" | "inactive" | "Coming Soon";
}

interface CategoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  category: Category | null;
  onSave: (category: Category) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, setIsOpen, category, onSave }) => {
  const [formData, setFormData] = useState<Category>({
    name: category?.name || "",
    description: category?.description || "",
    slug: category?.slug || "",
    status: category?.status || "active",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={category ? "Edit Category" : "Add Category"}>
      <div className="space-y-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
        <Input label="Description" name="description" value={formData.description} onChange={handleChange} />

        {/* Image File Upload */}
        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded" />}
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="Coming Soon">Coming Soon</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{category ? "Update" : "Add"}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;
