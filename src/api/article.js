import request from '@/utils/request'

// 获取文章分类列表
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}

//添加文章分类列表
export const artAddChannelService = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })
}
//更新文章分类列表
export const artUpdateChannelService = (obj) => {
  return request.put('/my/cate/info', {
    ...obj
  })
}
//删除文章分类列表
export const artDelChannelService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

//获取文章列表
export const artGetListService = (params) => {
  // console.log(params)
  return request.get('/my/article/list', {
    params
  })
}
//添加文章
export const addArticleService = (data) => {
  // console.log(data)
  return request.post('/my/article/add', data)
}
//获取文章详情
export const artGetInfoService = (id) => {
  return request.get('/my/article/info', {
    params: { id }
  })
}
// 更新文章详情
export const artUpdateInfoService = (data) => {
  return request.put('/my/article/info', data)
}
// 删除文章
export const artDelInfoService = (id) => {
  return request.delete('/my/article/info', {
    params: { id }
  })
}
