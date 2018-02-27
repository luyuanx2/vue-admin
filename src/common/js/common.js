export const statusOptions = [
  {key: 1, display_name: '有效'},
  {key: 0, display_name: '无效'}
]

export const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export const textMap =  {
  update: '编辑',
  create: '新增'
}

export const statusTypeMap = {
  1: 'success',
  0: 'error'
}
