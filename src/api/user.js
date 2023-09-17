import request from '@/utils/request'

// 注册
export const UserRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}
//登录
export const UserLoginService = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}
// 获取用户信息
export const GetUserInfoService = () => {
  return request.get('/my/userinfo')
}
// 更新用户信息
export const UpdateUserInfoService = (obj) => {
  return request.put('/my/userinfo', {
    ...obj
  })
}
// 更新用户头像
export const UpdateUserAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar
  })
}
// 修改密码
export const UpdateUserPasswordService = (NewPassword) => {
  return request.patch('/my/updatepwd', {
    ...NewPassword
  })
}
