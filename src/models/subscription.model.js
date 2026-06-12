import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  plan: {
    type: String,
    required: true,
  },
  stripeId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Subscription', subscriptionSchema);
