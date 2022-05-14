/**
 * @description: List
 * @param {ExtraParams} extraParmas 
*/
export const get = (params?, extraParmas?: ExtraParams): Promise<BaseResponse<>> => {
  const url = `/list`;
  return request({ url, params, ...extraParmas });
};

/**
 * @description: Info
 * @param {ExtraParams} extraParmas 
*/
export const get = (params?, extraParmas?: ExtraParams): Promise<BaseResponse<>> => {
  const url = `/info`;
  return request({ url, params, ...extraParmas });
};

