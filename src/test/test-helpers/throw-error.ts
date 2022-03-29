export const throwError = async (): Promise<never> => {
  return new Promise((resolve, reject) => reject(new Error()))
}
