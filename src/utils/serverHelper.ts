import axios from "axios";
import { Raxios } from "./axiosHelper";

export type AxiosType = "api" | "backend";

export const getData = async <T>(url: string, type?: AxiosType): Promise<T> => {
  const res = await axios.get("/api/register?name=userToken");
  const token = res?.data?.value?.value;

  if (type === "api") {
    const data = await Raxios.get<T>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  }
  const data = await Raxios.get<T>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
};

export const postData = async <T, B>(
  url: string,
  req: B,
  type?: AxiosType
): Promise<T> => {
  const res = await axios.get("/api/register?name=userToken");

  const pToken = res?.data?.value?.value;

  const token = pToken;

  if (type === "api") {
    const data = await Raxios.post<T>(url, req, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  }
  const data = await Raxios.post<T>(url, req, {
    headers: {
      Authorization:
        token !== null && token !== undefined ? `Bearer ${token}` : null,
    },
  });

  return data.data;
};

export const putData = async <T, B>(
  url: string,
  req: B,
  type?: AxiosType
): Promise<T> => {
  const res = await axios.get("/api/register?name=userToken");
  const token = res?.data?.value?.value;

  if (type === "api") {
    const data = await Raxios.put<T>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  }
  const data = await Raxios.put<T>(url, req, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};

export const deleteData = async <T>(
  url: string,
  params: object,
  type?: AxiosType
): Promise<T> => {
  const res = await axios.get("/api/register?name=userToken");
  const token = res?.data?.value?.value;

  if (type === "api") {
    const data = await Raxios.delete<T>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  }
  const data = await Raxios.delete<T>(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return data.data;
};
