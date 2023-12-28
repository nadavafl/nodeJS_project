export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

export const phonePattern =
  /^((\+972|0)(-)?([23489]|5[023468]|77)(-)?[1-9]\d{6})$/

export const patterns = { password: passwordPattern, phone: phonePattern }
