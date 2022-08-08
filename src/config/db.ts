const mongoose = require('mongoose');

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL);
    console.log('Database connection is successful');
  } catch (err) {
    console.error(err);
  }
};
