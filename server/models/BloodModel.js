import mongoose, { Schema } from "mongoose";

const BloodRequestSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bloodg: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      default: "1",
    },
    hospital: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status:{
        type: String,
        required: true
    }, 
    userId: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const BloodRequest = mongoose.model("BloodReq", BloodRequestSchema);

export default BloodRequest;
