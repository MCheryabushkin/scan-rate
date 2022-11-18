export const getGUID = (): string => {
    const url = URL.createObjectURL(new Blob());
    const id = url.toString().split('/').pop();
    URL.revokeObjectURL(url);
    return id ? id : '';
  }
  