const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export interface BloodDonationRequest {
  blood_type: string;
  blood_bag_quantity: string;
  createdAt: string;
  district: string;
  donation_date: string;
  location: string;
  patient_name: string;
  phone_number: string;
  situation: string;
  status: string;
  updatedAt: string;
  user_id: string;
  __v: number;
  _id: string;
}
interface valueTypes {
  group: string;
  district: string;
  priority: string;
}
export const fetchDonationRequests = async (
  values?: valueTypes
): Promise<BloodDonationRequest[]> => {
  // bg, district, situation
  const response = await fetch(
    `${API_BASE_URL}/request${
      values
        ? `?bg=${values.group}&district=${values.district}&situation=${values.priority}`
        : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching donation requests: ${response.statusText}`);
  }

  const data: { requests: BloodDonationRequest[] } = await response.json();
  return data.requests;
};
