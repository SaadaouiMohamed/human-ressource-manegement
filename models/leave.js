import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    // enum: ["congée annuelle", "congée de maladie", "télétravail"],
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
    type: Boolean,
    default: false,
  }
},
  {
    timestamps : true,
  });


  const Leave = mongoose.model('Leave' , leaveSchema)

  export default Leave;