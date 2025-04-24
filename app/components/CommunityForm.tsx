"use client";

import React, { SyntheticEvent, useState } from "react";
import { Community } from "../components/Community";

interface CommunityFormProps {
  onCancel: () => void;
  onSave: (community: Community) => void;
  community: Community;
}

export function DisplayCommunityForm({
  onCancel,
  onSave,
  community: initialCommunity,
}: CommunityFormProps) {
  const [community, setCommunity] = useState(initialCommunity);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    county: "",
  });

  // Validate the community fields
  const validate = (community: Community) => {
    let errors: any = { name: "", description: "", county: "" };
    if (community.name.length === 0) {
      errors.name = "Name is required.";
    }
    if (community.name.length > 0 && community.name.length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }
    if (community.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (community.county.length === 0) {
      errors.county = "County is required.";
    }
    return errors;
  };

  // Check if the form is valid
  const isValid = () => {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.county.length === 0
    );
  };

  const handleOnClickSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) {
      return;
    }
    onSave(community); // Call the onSave function passed as prop
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    let updatedValue = type === "checkbox" ? checked : value;
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }

    const change = {
      [name]: updatedValue,
    };

    let updatedCommunity: Community;
    setCommunity((c) => {
      updatedCommunity = new Community({ ...c, ...change });
      return updatedCommunity;
    });

    setErrors(() => validate(updatedCommunity));
  };

  return (
    <form className="input-group vertical" onSubmit={handleOnClickSubmit}>
      <label htmlFor="name">Community Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter community name"
        value={community.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 && (
        <div className="text error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="description">Community Description</label>
      <textarea
        name="description"
        placeholder="Enter description of community"
        value={community.description}
        onChange={handleChange}
      ></textarea>
      {errors.description.length > 0 && (
        <div className="text error">
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor="county">County</label>
      <input
        type="text"
        name="county"
        placeholder="Enter a county"
        value={community.county}
        onChange={handleChange}
      />
      {errors.county.length > 0 && (
        <div className="text error">
          <p>{errors.county}</p>
        </div>
      )}

      <label htmlFor="isVisited">Visited?</label>
      <input
        type="checkbox"
        name="isVisited"
        checked={community.is_visited}
        onChange={handleChange}
      />

      <div className="input-group">
        <button className="primary bordered medium" type="submit">
          Save
        </button>
        <span></span>
        <button type="button" className="bordered medium" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
