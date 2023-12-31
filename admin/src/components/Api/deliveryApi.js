import axios from "axios";

const BASE_API = `http://localhost:8070`;
export const deliverDelete = async (deliveryId) => {
  await axios
    .delete(`${BASE_API}/delivery/${deliveryId}`)
    .then((response) => {
      console.log("Deleted successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error deleting:", error);
    });
  await fetchDeliveries();
};

export const fetchDeliveries = async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/deliveries`);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postDelivery = async (values) => {
  try {
    await axios.post(`${BASE_API}/delivery`, values);
  } catch (err) {
    console.error(err);
  }
};

export const putDelivery = async (values, id) => {
  try {
    const { data } = await axios.put(`${BASE_API}/delivery/${id}`, values);
    await fetchDeliveries();
    return data;
  } catch (err) {
    console.error(err);
  }
};
