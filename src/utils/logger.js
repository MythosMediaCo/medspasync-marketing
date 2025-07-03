const log = (...args) => {
  if (import.meta.env.MODE === 'development') {
    console.log(...args);
  }
};

const error = (...args) => {
  if (import.meta.env.MODE === 'development') {
    console.error(...args);
  }
};

export default { log, error };
