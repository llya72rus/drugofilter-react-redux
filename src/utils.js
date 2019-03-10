const isMatching = (firstName, lastName, chunk) => {
  return (
    firstName.toLowerCase().indexOf(chunk.toLowerCase()) > -1 ||
    lastName.toLowerCase().indexOf(chunk.toLowerCase()) > -1
  );
};

export { isMatching };
