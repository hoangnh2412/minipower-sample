export const invoicePaths = {
  list: '/hoa-don',
  create: '/hoa-don/tao-moi',
  edit: (id: string) => `/hoa-don/${id}/sua`,
  copy: (id: string) => `/hoa-don/sao-chep/${id}`,
} as const
