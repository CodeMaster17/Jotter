interface StorageAdapter {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<void>;
  remove: (key: string) => Promise<void>;
}

class ChromeStorageAdapter implements StorageAdapter {
  async get(key: string): Promise<string | null> {
    const result = await chrome.storage.local.get([key]);
    return result[key] || null;
  }

  async set(key: string, value: string): Promise<void> {
    await chrome.storage.local.set({ [key]: value });
  }

  async remove(key: string): Promise<void> {
    await chrome.storage.local.remove([key]);
  }
}

class LocalStorageAdapter implements StorageAdapter {
  async get(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async set(key: string, value: string): Promise<void> {
    console.log("To set value received:", value);
    localStorage.setItem(key, value);
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

export const storage =
  typeof chrome !== "undefined" && chrome.storage
    ? new ChromeStorageAdapter()
    : new LocalStorageAdapter();
