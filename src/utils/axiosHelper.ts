import axios from 'axios';

export const AWS_URL = 'https://6x4j0qxbmk.execute-api.ap-south-1.amazonaws.com/main';
// export const AWS_URL = 'http://localhost:8080';

export const Raxios = axios.create({
  baseURL: AWS_URL,
  timeout: 60 * 1000,
  maxRedirects: 0,
});

const format_response = (response: any) => {
  return {
    ...response,
    data: response.data.output_details,
    status: response.data.output_status === 'SUCCESS' ? 200 : 400,
    msg: response.data.output_message,
  };
};

Raxios.interceptors.response.use((response) => {
  return format_response(response);
});

export const setCookie = async (name: string, value: string) => {
  const setCookieApiResponse = await axios({
    url: '/api/register',
    method: 'POST',
    data: {
      name: name,
      value: value,
    },
  });
  return setCookieApiResponse.data;
};

export const getCookie = async (name: string) => {
  const getCookieApiResponse = await axios({
    url: '/api/register',
    method: 'GET',
    params: {
      name: name,
    },
  });

  return getCookieApiResponse.data;
};

export const deleteCookie = async () => {
  const deleteCookieApiResponse = await axios({
    url: '/api/register',
    method: 'DELETE',
  });

  return deleteCookieApiResponse.data;
};

interface GetAllUpcomingEventsParams {
  isHomePage?: boolean;
  fromToday?: boolean;
  page?: number;
  size?: number;
}

export const getAllUpcomingEvents = async ({
  isHomePage = false,
  fromToday = true,
  page = 1,
  size = 50,
}: GetAllUpcomingEventsParams) => {
  try {
    const response = await Raxios.get(`/actions/list_events`, {
      params: { fromToday, page, size, isHomePage },
    });
    return response;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return { success: false, data: { data: [] } };
  }
};

interface createEvent {
  userId?: string;
  eventName: string;
  token: string;
  slug: string;
  phoneNumber?: string;
}


export const createEventByExternal = async ({
  phoneNumber,
  name,
  slug,
  dob,
  city,
  mainTitle,
}: {
  phoneNumber: string;
  name: string;
  slug: string;
  dob: string;
  city: string;
  mainTitle: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: AWS_URL,
      url: '/actions/upsert_event_user',
      data: {
        phoneNumber: phoneNumber.slice(-10), // Extract the last 10 digits
        name,
        source: slug,
        dob,
        city,
        eventName: mainTitle,
        advSeenOn: slug,
      },
    });

    if (response.status === 200) {
      return { success: true, message: 'User registered successfully' };
    } else {
      return { success: false, message: `Failed with status: ${response.status}` };
    }
  } catch (error: any) {
    console.error('Error:', error.message);
    return { success: false, message: `Error: ${error.message}` };
  }
};




export const createUserByExternal = async ({
  phoneNumber,
  name,
  refSource,
  birthDate,
  city,
}: {
  phoneNumber: string;
  name: string;
  refSource: string;
  birthDate: string;
  city: string;
  mainTitle: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: AWS_URL,
      url: '/actions/user',
      data: {
        phoneNumber: phoneNumber.slice(-10), // Extract the last 10 digits
        name,
        refSource,
        birthDate,
        city,
      },
    });

    if (response.status === 200) {
      return { success: true, message: 'User registered successfully' };
    } else {
      return { success: false, message: `Failed with status: ${response.status}` };
    }
  } catch (error: any) {
    console.error('Error:', error.message);
    return { success: false, message: `Error: ${error.message}` };
  }
};



export const createEventByUserId = async ({
  userId = '',
  eventName = '',
  slug = '',
  token='',
  phoneNumber = '',
}: createEvent) => {
  try {
    const response = await axios({
      baseURL: AWS_URL,
      method: 'POST',
      url: `/actions/upsert_event_user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        eventName,
        phoneNumber,
        source: slug,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event by user ID:', error);
    return { success: false, data: { data: [] } };
  }
};

export const createGame = async (
  sarathiID: string,
  userName: string = '',
  userId = '',
  category: string = '',
  gameuuid: string = '',
  gameLink: string
) => {
  return axios({
    method: 'POST',
    baseURL: AWS_URL,
    url: '/expert/createNewGames',
    data: {
      sarathiID: sarathiID,
      gameLink: gameLink,
      userName: userName,
      userId: userId,
      level: 1,
      gameuuid: gameuuid,
      category: category,
      isDebug: false,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { message: 'SarathiID & gameLink not passed', err };
    });
};

export interface EventDetails {
  user_name?: string;
  event_name?: string;
  custom_text?: string;
  topic_name?: string;
  speakers_name?: string;
  date_and_time?: string;
  webinar_link?: string;
  phone_number?: string;
  whatsapp_community_link?: string;
  image_link?: string;
}

export const sendWaMessage = async (
  phoneNumber: string,
  message: EventDetails = {
    user_name: 'Sukoon',
    event_name: 'Sukoon Event',
    custom_text: 'Thank you for registering for the event. We will send you the event details soon.',
    topic_name: 'Sukoon Event',
    speakers_name: 'Sukoon Team',
    phone_number: "+918660610840",
    date_and_time: '2021-08-06T18:30:00.000Z',
    webinar_link: 'https://sukoonunlimited.com/wa-join-community',
  }
) => {
  return axios({
    method: 'POST',
    baseURL: AWS_URL,
    url: '/actions/send_whatsapp',
    data: {
      phone_number: phoneNumber,
      template_name: 'EVENT_REGISTRATION_CONFIRMATION',
      parameters: message,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { message: 'SarathiID & gameLink not passed', err };
    });
};
