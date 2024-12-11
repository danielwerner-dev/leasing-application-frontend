const enterCallback = (callback: () => void) => {
  return (event: KeyboardEvent) => {
    if (event.key === "Enter" && callback) {
      callback();
    }
  };
};

export default enterCallback;
