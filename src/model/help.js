import dayjs from 'dayjs'

export const baseSchema = {
  createdAt: {
    type: String,
    select: false
  },
  updatedAt: {
    type: String,
    select: false
  }
}

export const option = {
  versionKey: false,
  timestamps: {
    // 修改默认时间格式，当然根据需要也可以转出时间戳
    currentTime: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
}
