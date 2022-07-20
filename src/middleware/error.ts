export const errorResponse = (message: string, status: number = 400) => {
  return { status, message };
};
