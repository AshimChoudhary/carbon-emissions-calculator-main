export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
};

export const validateActivityValue = (
  value: number,
  type: string,
): string | null => {
  if (value <= 0) {
    return "Value must be greater than 0";
  }

  if (type === "transport" && value > 10000) {
    return "Distance seems unusually high (max 10,000 km)";
  }

  if (type === "energy" && value > 1000) {
    return "Energy consumption seems unusually high (max 1,000 kWh)";
  }

  if (type === "diet" && value > 10) {
    return "Number of meals seems unusually high (max 10)";
  }

  return null;
};

export const validateDate = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return selectedDate <= today;
};
