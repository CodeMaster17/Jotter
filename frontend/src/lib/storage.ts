interface StorageData {
  profileData?: {
    linkedin: string;
    github: string;
    portfolio: string;
    resume: string;
  };
  answers?: Array<{
    question: string;
    answer: string;
  }>;
}

class StorageService {
  private isExtension: boolean;

  constructor() {
    this.isExtension =
      typeof chrome !== "undefined" && chrome.storage !== undefined;
  }

  async get<T extends keyof StorageData>(
    key: T
  ): Promise<StorageData[T] | undefined> {
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

  async set<T extends keyof StorageData>(
    key: T,
    value: StorageData[T]
  ): Promise<void> {
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
