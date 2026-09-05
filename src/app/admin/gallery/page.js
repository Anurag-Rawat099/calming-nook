"use client";

import { useEffect, useState } from "react";
import {
  ImagePlus,
  Star,
  Trash2,
  Pencil,
  Search,
  Loader2,
} from "lucide-react";

const categories = [
  "All",
  "Property",
  "Rooms",
  "Exterior",
  "Interior",
  "View",
  "Food",
  "Activities",
];

const initialForm = {
  title: "",
  category: "Property",
  description: "",
  image: {
    url: "",
    publicId: "",
  },
  isFeatured: false,
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [filteredGallery, setFilteredGallery] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    filterGallery();
  }, [gallery, search, selectedCategory]);

  /* ---------------- FETCH GALLERY ---------------- */

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setGallery(data.gallery);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER ---------------- */

  const filterGallery = () => {
    let items = [...gallery];

    if (selectedCategory !== "All") {
      items = items.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (search.trim()) {
      items = items.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredGallery(items);
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleImageUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true);

      const uploadData = new FormData();

      uploadData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: uploadData,
      });

      const data = await res.json();

      if (data.success) {
        setForm((prev) => ({
          ...prev,
          image: data.image,
        }));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    if (!form.title || !form.image.url) {
      alert("Please upload an image and enter title.");
      return;
    }

    try {
      setSaving(true);

      const url = editingId
        ? `/api/gallery/${editingId}`
        : "/api/gallery";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          editingId
            ? "Gallery Updated."
            : "Image Added Successfully."
        );

        setEditingId(null);
        setForm(initialForm);

        fetchGallery();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = (item) => {
    setEditingId(item._id);

    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      isFeatured: item.isFeatured,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ---------------- DELETE ---------------- */

  const deleteImage = async (id) => {
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setGallery((prev) =>
          prev.filter((img) => img._id !== id)
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>
        <p className="uppercase tracking-[6px] text-[var(--primary)] text-xs">
          Website Gallery
        </p>

        <h1 className="text-4xl font-bold mt-3">
          Gallery Management
        </h1>

        <p className="text-black/50 mt-3">
          Upload, edit and manage photos for Calming Nook.
        </p>
      </div>

      {/* UPLOAD CARD */}

      <div className="bg-white border border-black/5 p-8 rounded-xl space-y-6">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">
            <ImagePlus className="text-[var(--primary)]" />

            <h2 className="text-xl font-semibold">
              {editingId
                ? "Edit Gallery Image"
                : "Add Gallery Image"}
            </h2>
          </div>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
              className="text-sm text-red-500"
            >
              Cancel Editing
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-sm font-medium">
              Image Title
            </label>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              placeholder="Mountain View Balcony"
              className="w-full mt-2 border border-black/10 bg-[#faf7f2] px-5 py-3 outline-none rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              className="w-full mt-2 border border-black/10 bg-[#faf7f2] px-5 py-3 outline-none rounded-lg"
            >
              {categories
                .filter((c) => c !== "All")
                .map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
            </select>
          </div>

        </div>

        {/* IMAGE PICKER */}

        <div>
          <label className="text-sm font-medium">
            Upload Image
          </label>

          <label className="mt-3 border-2 border-dashed border-[var(--primary)] bg-[#faf7f2] rounded-xl h-56 flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5efe3] transition">

            {uploading ? (
              <>
                <Loader2 className="animate-spin text-[var(--primary)] mb-3" />

                <p className="text-sm">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <ImagePlus
                  size={38}
                  className="text-[var(--primary)] mb-3"
                />

                <p className="font-medium">
                  Click to Upload
                </p>

                <p className="text-xs text-black/50 mt-1">
                  PNG, JPG, JPEG or WEBP
                </p>
              </>
            )}

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* PREVIEW */}

        {form.image.url && (
          <div className="space-y-3">
            <p className="text-sm font-medium">
              Preview
            </p>

            <img
              src={form.image.url}
              alt="Preview"
              className="w-full h-72 rounded-xl object-cover border border-black/10"
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium">
            Description
          </label>

          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            placeholder="Beautiful sunrise from Calming Nook."
            className="w-full mt-2 border border-black/10 bg-[#faf7f2] px-5 py-3 rounded-lg resize-none outline-none"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) =>
              setForm({
                ...form,
                isFeatured: e.target.checked,
              })
            }
          />

          <span className="text-sm font-medium">
            Featured Image
          </span>
        </label>

        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="bg-[var(--primary)] text-white px-8 py-3 rounded-lg disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : editingId
            ? "Update Image"
            : "Add Image"}
        </button>

      </div>

      {/* SEARCH + FILTER */}

      <div className="bg-white border border-black/5 rounded-xl p-6 flex flex-col md:flex-row gap-4 justify-between">

        <div className="relative flex-1">

          <Search className="absolute left-4 top-3 text-black/40" size={18} />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search gallery..."
            className="w-full border border-black/10 bg-[#faf7f2] py-3 pl-12 pr-4 rounded-lg outline-none"
          />

        </div>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="border border-black/10 bg-[#faf7f2] px-5 py-3 rounded-lg outline-none"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

      </div>

      {/* GALLERY GRID */}

      <div>

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold">
            Gallery Images
          </h2>

          <span className="text-sm text-black/50">
            {filteredGallery.length} Images
          </span>

        </div>

        {loading ? (
          <p>Loading gallery...</p>
        ) : filteredGallery.length === 0 ? (
          <div className="bg-white border border-dashed border-black/10 p-20 rounded-xl text-center">
            <ImagePlus
              size={42}
              className="mx-auto text-black/30"
            />

            <p className="mt-4 text-black/50">
              No images found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredGallery.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden border border-black/5 hover:shadow-lg transition"
              >

                <img
                  src={item.image.url}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5 space-y-4">

                  <div className="flex justify-between items-center">

                    <span className="bg-[#faf7f2] text-[var(--primary)] text-xs font-medium px-3 py-1 rounded-full">
                      {item.category}
                    </span>

                    {item.isFeatured && (
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    )}

                  </div>

                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-sm text-black/60 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex justify-between pt-2 border-t border-black/5">

                    <button
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="flex items-center gap-2 text-[var(--primary)] text-sm hover:underline"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteImage(item._id)
                      }
                      className="flex items-center gap-2 text-red-500 text-sm hover:underline"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}