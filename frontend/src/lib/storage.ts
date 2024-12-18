import { ILinkItem } from "@/types";

class StorageService {
  private isExtension: boolean;

  constructor() {
    this.isExtension =
      typeof chrome !== "undefined" && chrome.storage !== undefined;
  }

  // Get method specific to ILinkItem keys and values
  async get<T extends keyof ILinkItem>(
    key: T
  ): Promise<ILinkItem[T] | undefined> {
    if (this.isExtension) {
      return new Promise((resolve) => {
        chrome.storage.sync.get([key], (result) => {
          resolve(result[key]);
        });
      });
    } else {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as ILinkItem[T]) : undefined;
    }
  }

  // Set method specific to ILinkItem keys and values
  async set<T extends keyof ILinkItem>(
    key: T,
    value: ILinkItem[]
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
