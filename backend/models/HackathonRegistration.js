import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  organization: String,
  current_designation: String,
  years_of_experience: String,
});

const RegistrationSchema = new mongoose.Schema(
  {
    hackathon_id: { type: String, required: true },
    participation_type: { type: String, required: true },
    is_team_registration: { type: Boolean, default: false },

    individual: ParticipantSchema,

    team_name: String,
    team_leader: ParticipantSchema,
    team_members: [ParticipantSchema],

    why_do_you_want_to_participate: String,
    agree_to_terms: Boolean,

    is_payment_required: Boolean,
    payment_status: String,
    payment_reference: String,
    paid_amount: String,
    payment_mode: String,
  },
  { timestamps: true }
);

export default mongoose.model("HackathonRegistration", RegistrationSchema);
