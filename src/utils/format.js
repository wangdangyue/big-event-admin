import { dayjs } from 'element-plus'
export const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD hh:mm:ss')
}
