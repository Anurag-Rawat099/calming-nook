"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    whatsapp: "",
    email: "",
    googleMapsUrl: "",
    checkInTime: "02:00 PM",
    checkOutTime: "11:00 AM",
    cancellationPolicy: "",
    houseRules: "",
    instagram: "",
    facebook: "",
    youtube: "",
    logo: {
      url: "",
      publicId: "",
    },
    coverImage: {
      url: "",
      publicId: "",
    },
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await fetch("/api/property", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success && data.property) {
        setFormData({
          ...formData,
          ...data.property,
          logo: data.property.logo || { url: "", publicId: "" },
          coverImage: data.property.coverImage || {
            url: "",
            publicId: "",
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNestedChange = (field, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const check = await fetch("/api/property", {
        credentials: "include",
      });

      const checkData = await check.json();

      const method =
        checkData.success && checkData.property
          ? "PUT"
          : "POST";

      const res = await fetch("/api/property", {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Settings Updated Successfully.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading Property Settings...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <p className="uppercase tracking-[6px] text-[var(--primary)] text-xs">
          Website Settings
        </p>

        <h1 className="text-4xl font-bold mt-3">
          Property Information
        </h1>

        <p className="text-black/50 mt-3">
          Manage all information displayed on your Calming Nook website.
        </p>
      </div>

      <div className="bg-white border border-black/5 p-8 space-y-10">

        {/* Basic Information */}

        <div>
          <h2 className="text-xl font-semibold mb-6">
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Property Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Calming Nook"
            />

            <Input
              label="Tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="A peaceful stay in the mountains"
            />

          </div>

          <Textarea
            label="Property Description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property..."
          />
        </div>

        {/* Contact */}

        <div>
          <h2 className="text-xl font-semibold mb-6">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@calmingnook.com"
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
            />

            <Input
              label="WhatsApp Number"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+91 9876543210"
            />

          </div>
        </div>

        {/* Location */}

        <div>
          <h2 className="text-xl font-semibold mb-6">
            Property Address
          </h2>

          <Textarea
            label="Full Address"
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            placeholder="Village, District, State..."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Dehradun"
            />

            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Uttarakhand"
            />

            <Input
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="248001"
            />

          </div>

          <Input
            label="Google Maps URL"
            name="googleMapsUrl"
            value={formData.googleMapsUrl}
            onChange={handleChange}
            placeholder="https://maps.google.com/..."
          />
        </div>

        {/* Check In/Out */}

        <div>
          <h2 className="text-xl font-semibold mb-6">
            Stay Timing
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Check-in Time"
              name="checkInTime"
              value={formData.checkInTime}
              onChange={handleChange}
            />

            <Input
              label="Check-out Time"
              name="checkOutTime"
              value={formData.checkOutTime}
              onChange={handleChange}
            />

          </div>
        </div>

        {/* Policies */}

        <div>
          <h2 className="text-xl font-semibold mb-6">
            Policies
          </h2>

          <Textarea
            label="Cancellation Policy"
            name="cancellationPolicy"
            rows={4}
            value={formData.cancellationPolicy}
            onChange={handleChange}
            placeholder="Write cancellation policy..."
          />

          <Textarea
            label="House Rules"
            name="houseRules"
            rows={4}
            value={formData.houseRules}
            onChange={handleChange}
            placeholder="No smoking, quiet hours, etc."
          />
        </div>

        {/* Social */}

        <div>
          <h2 className="text-xl font-semibold mb-6">
            Social Media Links
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
            />

            <Input
              label="Facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />

            <Input
              label="YouTube"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
            />

          </div>
        </div>

        {/* Website Images */}

        <div>
          <h2 className="text-xl font-semibold mb-6">
            Website Images
          </h2>

          <div className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">

              <Input
                label="Logo URL"
                value={formData.logo.url}
                onChange={(e) =>
                  handleNestedChange(
                    "logo",
                    "url",
                    e.target.value
                  )
                }
                placeholder="https://..."
              />

              <Input
                label="Logo Public ID"
                value={formData.logo.publicId}
                onChange={(e) =>
                  handleNestedChange(
                    "logo",
                    "publicId",
                    e.target.value
                  )
                }
                placeholder="cloudinary/public-id"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <Input
                label="Cover Image URL"
                value={formData.coverImage.url}
                onChange={(e) =>
                  handleNestedChange(
                    "coverImage",
                    "url",
                    e.target.value
                  )
                }
                placeholder="https://..."
              />

              <Input
                label="Cover Image Public ID"
                value={formData.coverImage.publicId}
                onChange={(e) =>
                  handleNestedChange(
                    "coverImage",
                    "publicId",
                    e.target.value
                  )
                }
                placeholder="cloudinary/public-id"
              />

            </div>

          </div>
        </div>

        {/* Save Button */}

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-2 bg-[var(--primary)] text-white px-8 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-all"
        >
          {saving ? "Saving..." : "Save Property Information"}
        </button>

      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full mt-3 border border-black/10 bg-[#faf7f2] px-5 py-3 outline-none"
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
}) {
  return (
    <div className="mt-6">
      <label className="text-sm font-medium">{label}</label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full mt-3 border border-black/10 bg-[#faf7f2] px-5 py-3 outline-none resize-none"
      />
    </div>
  );
}