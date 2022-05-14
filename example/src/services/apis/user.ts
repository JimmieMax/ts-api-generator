/**
 *
 * Module: User
 *
*/
import request from "@/utils/request";

/**
 * @description: List
 * @param {ExtraParams} extraParmas 
*/
export const getUserList = (params?, extraParmas?: ExtraParams): Promise<BaseResponse<>> => {
  const url = `/user/list`;
  return request({ url, params, ...extraParmas });
};

/**
 * @description: Info
 * @param {ExtraParams} extraParmas 
*/
export const getUserInfo = (params?, extraParmas?: ExtraParams): Promise<BaseResponse<>> => {
  const url = `/user/info`;
  return request({ url, params, ...extraParmas });
};

