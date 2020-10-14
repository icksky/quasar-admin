export const isExternal = (path?: string) => path && /^(https?:|mailto:|tel:)/.test(path)
