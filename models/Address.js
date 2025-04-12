import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  label: { type: String },
  type: {
    shipping: { type: Boolean, default: false },
    billing: { type: Boolean, default: false },
  },
});

export default mongoose.models.Address || mongoose.model("Address", AddressSchema);
