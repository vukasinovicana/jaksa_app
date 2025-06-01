type ValidationRule = {
  regex: RegExp;
  message: string;
};

export const passwordRule: ValidationRule = {
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
  message:
    "Lozinka mora imati najmanje 6 karaktera, uključujući veliko i malo slovo i jedan broj.",
};

export const emailRule: ValidationRule = {
  regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Neispravna email adresa.",
};

export const phoneRule: ValidationRule = {
  regex: /^[0-9]{6,15}$/,
  message: "Broj mora sadržati 6-15 cifara.",
};

export const validateField = (
  value: string,
  rule: ValidationRule,
  setError: (msg: string) => void
) => {
  if (!rule.regex.test(value)) {
    setError(rule.message);
  } else {
    setError("");
  }
};
