import mongoose from "mongoose";
import {nanoid} from "nanoid";

// const citySchema =  new.Schema()    
const shipmentSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: [true, "Origin is not provided"],
    },
    destination: {
      type: String,
      required: [true, "Destination is not provided"],
    },
    shipment_number: {
      type: String,
      required: [true, "shipment_number is not generated"],
      default: () => nanoid(10), 
      index: { unique: true },
    },
    hops :[String],
  },
  {
    timestamps: true,
  }
);

// Shipment.plugin(autoIncrement.plugin,{
//     model: "Shipment",
//     field:"shipment_number",
//     startAt :12345,
//     incrementBy:1,

// })
const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;
