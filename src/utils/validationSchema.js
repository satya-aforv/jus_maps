export const emailSchema = {
  required: 'Email is required',
  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
};

export const passwordSchema = {
  required: 'Password is required',
  minLength: { value: 8, message: 'Password must be at least 8 characters' }
};

export const confirmPasswordSchema = {
  required: 'Confirm Password is required',
  minLength: { value: 8, message: 'Password must be at least 8 characters' }
};

export const firstNameSchema = {
  required: 'First name is required',
  pattern: { value: /^[a-zA-Z\s]+$/, message: 'Invalid first name' }
};

export const lastNameSchema = {
  required: 'Last name is required',
  pattern: { value: /^[a-zA-Z\s]+$/, message: 'Invalid last name' }
};

export const usernameSchema = {
  required: 'Username is required',
  minLength: {
    value: 4,
    message: 'Username must be at least 4 characters'
  },
  maxLength: {
    value: 20,
    message: 'Username cannot exceed 20 characters'
  },
  pattern: {
    value: /^[a-z0-9_]+$/,
    message: 'Only lowercase letters, numbers, and underscores allowed'
  },
  validate: {
    noConsecutiveUnderscores: (value) => !/_{2,}/.test(value) || 'No consecutive underscores',
    startsWithLetter: (value) => /^[a-z]/.test(value) || 'Must start with a letter'
  }
};

export const roleSchema = {
  required: 'Role is required',
  validate: (value) => {
    const validRoles = ['admin', 'manager', 'supervisor', 'user', 'guest'];
    return validRoles.includes(value) || `Role must be one of: ${validRoles.join(', ')}`;
  }
};

export const departmentSchema = {
  required: 'Department is required',
  minLength: {
    value: 2,
    message: 'Must be at least 2 characters'
  },
  maxLength: {
    value: 30,
    message: 'Cannot exceed 30 characters'
  },
  pattern: {
    value: /^[A-Za-z][A-Za-z\s\-']+$/,
    message: 'Must start with letter and only contain letters, spaces, hyphens, and apostrophes'
  }
};

export const employeeIdSchema = {
  required: 'Employee ID is required',
  pattern: {
    value: /^EMP\d{5}$/,
    message: 'Employee ID must be in format EMP followed by 5 digits (e.g. EMP00433)'
  },
  validate: {
    notDefault: (value) => value !== 'EMP00000' || 'Cannot use default employee ID'
    // Optional async validation example:
    // unique: async value => await isEmployeeIdUnique(value) || 'Employee ID already exists'
  }
};
