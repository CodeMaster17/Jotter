class StorageService {
  constructor() {
    this.isExtension =
      typeof chrome !== "undefined" && chrome.storage !== undefined;
  }

  // Get method for retrieving values
  async get(key) {
    if (this.isExtension) {
      return new Promise((resolve) => {
        chrome.storage.sync.get([key], (result) => {
          resolve(result[key]);
        });
      });
    } else {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    }
  }

  // Set method for storing values
  async set(key, value) {
    if (this.isExtension) {
      return new Promise((resolve) => {
        chrome.storage.sync.set({ [key]: value }, resolve);
      });
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export const storage = new StorageService();
