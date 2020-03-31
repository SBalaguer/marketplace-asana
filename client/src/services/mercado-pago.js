import axios from "axios";

export const payment = async () => {
  try {
    const response = await axios.post("/api/transaction/payment");
    return response.data.response;
    //this will return success or failure
  } catch (error) {
    throw error;
  }
};

export const processPayment = async data => {
  try {
    console.log(data);
    const response = await axios.post("/api/transaction/process-payment", data);
    return response.data.response;
    //this will return success or failure
  } catch (error) {
    throw error;
  }
};
