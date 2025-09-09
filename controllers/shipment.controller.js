import Shipment from "../models/shipment.model.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";

const createShipment = catchAsyncErrors(async (req, res, next) => {
  if (!req.body)
    return new (ErrorHandler(
      "Origin and destination are required fields",
      400
    ))();
  const { origin, destination } = req.body;
  console.log(req.body);

  const shipment = await Shipment.create({
    // ...req.body,
    origin: origin,
    destination: destination,
    hops: [origin, destination],
  });

  res.status(201).json({
    success: true,
    message: "Shipment created successfully.",
    data: {
      shipment_number: shipment.shipment_number,
      hops: shipment.hops,
    },
    // shipment
  });
});
const addHop = catchAsyncErrors(async (req, res, next) => {
  const params = req.params;

//   const getShipment = await Shipment.findOne(req.params);
//     console.log(getShipment);

//   if (!getShipment)
//     return new (ErrorHandler("Shipment with ID not found", 400))();

  if (!req.body) {
    return new (ErrorHandler("no data found", 400))();
  }
//   cons


//   res.send(getShipment);
  const {previous_hop,next_hop,new_hop} = req.body;
  

  const updated = await Shipment.findOneAndUpdate(req.params, {origin:previous_hop,destination:next_hop,hops:[previous_hop,next_hop,newhop]})
  
res.status(201).json({
    success: true,
    message: "Shipment created successfully.",
    data: {
      shipment_number: updated.shipment_number,
      hops: updated.hops,
    },
    // shipment
  });

});

export { createShipment, addHop };
