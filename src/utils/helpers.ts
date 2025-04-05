'use client'
import appTheme from "@/theme";
import axios from "axios";
import { get_data_from_firebase } from "./firebase";

export const helpNumber = "+918660610849";

export const PREMIUM_TEXT = "This feature is exclusively available for Club Sukoon members. Become a member now";
export const META_SEO_TEXT = `At Sukoon Unlimited, we believe in the power of heartfelt connections and conversations for healthy aging. Join our exclusive community of Seniors to connect, contribute, learn, and support each other. For queries, reach out at +91 91106 73203`;
export const getStatusColor = (saarthiStatus: string) => {
  switch (saarthiStatus) {
    case "online":
    case "completed":
      return appTheme.colors.green;
    case "busy":
    case "pending":
      return "#0288d1";
    case "offline":
      return appTheme.colors.lightGray;
    case "failed":
      return "red";

    default:
      return appTheme.colors.lightGray;
  }
};

export const trimPhoneNumber = (phoneNumber: string) => {
  // Remove any non-digit characters
  let trimmedNumber = phoneNumber.replace(/\D/g, "");

  // Check if the number starts with "+91"
  if (trimmedNumber.startsWith("91") && trimmedNumber.length === 12) {
    // Remove the "+91" prefix
    trimmedNumber = trimmedNumber.slice(2);
  }

  return trimmedNumber;
};

export const alpha = (hex: string, alpha: number) => {
  let r = 0,
    g = 0,
    b = 0;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return `rgba(${r},${g},${b},${alpha})`;
};

export const convertToK = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};




export const checkAgent = async () => {

  try {
    const response = await axios.get('/api/deviceAgent')

    return response.data;

  } catch (error) {
    return { success: false };
  }

}


export const formatPrice = (price:number) => {
  if(price) {
    return new Intl.NumberFormat('en-IN',{
      style:"currency",
      currency:"INR",
      maximumFractionDigits:0,
    }).format(price);
  }
  else return price
 
}
export const getPricing = async () => {
  const pricing = await get_data_from_firebase('packagePricing')
  const price = pricing?.price || 2999;
  return {
    formatPricing: formatPrice(price),
    unformattedPrice: price
  }
}

export const indianLanguages = [
  { "key": "as", "value": "Assamese" },
  { "key": "bn", "value": "Bengali" },
  { "key": "brx", "value": "Bodo" },
  { "key": "doi", "value": "Dogri" },
  { "key": "gu", "value": "Gujarati" },
  { "key": "hi", "value": "Hindi" },
  { "key": "kn", "value": "Kannada" },
  { "key": "ks", "value": "Kashmiri" },
  { "key": "kok", "value": "Konkani" },
  { "key": "mai", "value": "Maithili" },
  { "key": "ml", "value": "Malayalam" },
  { "key": "mni", "value": "Manipuri" },
  { "key": "mr", "value": "Marathi" },
  { "key": "ne", "value": "Nepali" },
  { "key": "or", "value": "Odia" },
  { "key": "pa", "value": "Punjabi" },
  { "key": "sa", "value": "Sanskrit" },
  { "key": "sat", "value": "Santali" },
  { "key": "sd", "value": "Sindhi" },
  { "key": "ta", "value": "Tamil" },
  { "key": "te", "value": "Telugu" },
  { "key": "ur", "value": "Urdu" }
]

export const working_hours = [
  { "key": 1, "value": "1 Hour" },
  { "key": 2, "value": "2 Hours" },
  { "key": 3, "value": "3 Hours" },
  { "key": 4, "value": "4 Hours" },
  { "key": 5, "value": "5 Hours" },
  { "key": 6, "value": "6 Hours" },
  { "key": 7, "value": "7 Hours" },
  { "key": 8, "value": "8 Hours" },
  { "key": 9, "value": "9 Hours" },
  { "key": 10, "value": "10 Hours" },
  { "key": 11, "value": "11 Hours" },
  { "key": 12, "value": "12 Hours" }
]

export const genders = [
  { "key": 'male', "value": "Male" },
  { "key": 'female', "value": "Female" },
  { "key": 'notSay', "value": "Prefer Not to Say" },
]