import axios from "axios";
import { IPInfo } from "../types/lucia";

export const getIp = (req: any) => {
  const xForwardedFor = req.headers["x-forwarded-for"];

  const ip = Array.isArray(xForwardedFor)
    ? xForwardedFor[0]
    : xForwardedFor?.split(",")[0];

  if (ip) {
    return formatIp({ ip: ip });
  } else {
    return undefined;
  }
};

export const formatIp = ({ ip }: { ip: string | undefined }) => {
  if (!ip) {
    return undefined;
  }

  let formattedIp = ip;

  if (formattedIp.startsWith("::ffff:")) {
    return (formattedIp = formattedIp.slice(7)); // Remove prefix for IPv4 mapped IPv6 addresses
  }

  return formattedIp;
};

export const getIpData = async ({ ip }: { ip: string | undefined }) => {
  if (!ip) {
    return undefined;
  }

  const formattedIp = formatIp({ ip });

  try {
    const ipData = await axios.get(`https://ipapi.co/${formattedIp}/json`, {
      headers: {
        "User-Agent": "nodejs-ipapi-v1.02",
      },
    });

    if (ipData.data.error) {
      return undefined;
    }

    return ipData.data as IPInfo;
  } catch (error) {
    return undefined;
  }
};
