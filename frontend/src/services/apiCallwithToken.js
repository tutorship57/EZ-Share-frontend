import { ensureToken } from "../utils/checkToken";

export const tryFetch = async (selectedApi, accessToken) => {
  try {
    const res = await selectedApi(accessToken);
    return { ok: true, data: res };
  } catch (err) {
    return { ok: false, error: err };
  }
};

export const twoStepTryFetch = async (selectedApi, payload, accessToken, setAccessToken) => {
  console.log("Payload:", payload);

  try {
    const res = await selectedApi(payload, accessToken);
    return  res;
  } catch (err) {
    if (err.response?.status !== 403) {
      throw err;
    }
  }

  // Token อาจหมดอายุ → refresh ใหม่
  const newAccessToken = await ensureToken(accessToken, setAccessToken);

  try {
    const res = await selectedApi(payload, newAccessToken);
    return { ok: true, data: res };
  } catch (err) {
    throw err;
  }
};

export const twoStepTryFetchWithId = async (selectedId,selectedApi, accessToken, setAccessToken) => {

  try {
    const res = await selectedApi(selectedId, accessToken);
    return res;
  } catch (err) {
    if (err.response?.status !== 403) {
      throw err;
    }
  }

  // Token อาจหมดอายุ → refresh ใหม่
  const newAccessToken = await ensureToken(accessToken, setAccessToken);

  try {
    const res = await selectedApi(selectedId, newAccessToken);
    return res;
  } catch (err) {
    throw err;
  }
};


export const twoStepTryFetchCustom = async (selectedApi,accessToken,setAccessToken, ...args)=>{

  try {
    const res = await selectedApi(...args, accessToken);
    return res;
  } catch (err) {
    if (err.response?.status !== 403) {
      throw err;
    }
  }

  const newAccessToken = await ensureToken(accessToken, setAccessToken);

  try {
    const res = await selectedApi(...args, newAccessToken);
    return res;
  } catch (err) {
    throw err;
  }
}


