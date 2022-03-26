export const throwError = (): Promise<never> => {
  return new Promise((resolve, reject) => reject(new Error()))
}