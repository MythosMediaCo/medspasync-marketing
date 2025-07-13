import Papa from 'papaparse';

export async function parseTransactionFile(file, sourceType) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (ext !== 'csv') {
    throw new Error('Only CSV files are supported in this demo');
  }

  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data.map((row) => ({
          ...row,
          sourceSystem: sourceType
        }));
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
}
