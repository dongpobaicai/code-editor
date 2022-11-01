import request from './request'

// 获取文件资源
export function getFileByName(params) {
  return request({
    url: '/getFile/byName',
    method: 'get',
    params
  })
}