import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
     enum: ["congée annuelle", "congée de maladie", "télétravail"],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  numOfDays: {
    type: Number,
  },
  adminResponse: {
    type: String,
    enum: ["Pending", "Rejected", "Approved"],
    default: "Pending",
  }
},
  {
    timestamps : true,
  });


  const Leave = mongoose.model('Leave' , leaveSchema) 

  export default Leave;