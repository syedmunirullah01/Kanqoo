// lib/passwordValidation.js

const MIN_LENGTH = 8;

export const passwordRequirements = [
  {
    id: 'length',
    label: `At least ${MIN_LENGTH} characters`,
    test: (value) => typeof value === 'string' && value.length >= MIN_LENGTH,
  },
  {
    id: 'uppercase',
    label: 'Contains an uppercase letter',
    test: (value) => /[A-Z]/.test(value || ''),
  },
  {
    id: 'lowercase',
    label: 'Contains a lowercase letter',
    test: (value) => /[a-z]/.test(value || ''),
  },
  {
    id: 'number',
    label: 'Contains a number',
    test: (value) => /[0-9]/.test(value || ''),
  },
  {
    id: 'symbol',
    label: 'Contains a special character',
    test: (value) => /[^\w\s]/.test(value || ''),
  },
];

export const validatePassword = (value) => {
  if (typeof value !== 'string') {
    return {
      valid: false,
      failed: passwordRequirements.map((req) => req.id),
    };
  }

  const failed = passwordRequirements
    .filter((req) => !req.test(value))
    .map((req) => req.id);

  return {
    valid: failed.length === 0,
    failed,
  };
};

export const getPasswordStrength = (value) => {
  const { failed } = validatePassword(value);
  const passedCount = passwordRequirements.length - failed.length;

  if (passedCount === passwordRequirements.length && value.length >= 12) {
    return { label: 'Strong', variant: 'default', tone: 'strong', score: passedCount };
  }
  if (passedCount >= passwordRequirements.length - 1) {
    return { label: 'Good', variant: 'default', tone: 'good', score: passedCount };
  }
  if (passedCount >= 2) {
    return { label: 'Weak', variant: 'secondary', tone: 'weak', score: passedCount };
  }

  return { label: 'Very Weak', variant: 'destructive', tone: 'very-weak', score: passedCount };
};

