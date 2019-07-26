const dictionary: { [key: string]: string } = {
  admin: 'admin',
  student: 'student',
};

export const passwordAuth = async (
  username: string,
  password: string
): Promise<boolean> => {
  return dictionary[username] === password;
};
