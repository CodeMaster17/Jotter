import { ILinkItem } from "@/types";

class IndexedDBService {
  private dbName: string;
  private storeName: string;

  constructor(dbName = "StorageDB", storeName = "ILinkItems") {
    this.dbName = dbName;
    this.storeName = storeName;
    this.init();
  }

  // Initialize IndexedDB
  private async init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Set a value in IndexedDB
  async set<T>(key: string, value: T): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Get a value from IndexedDB
  async get<T>(key: string): Promise<T | undefined> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
    });
  }
}

class StorageService {
  private isExtension: boolean;
  private indexedDBService: IndexedDBService;

  constructor() {
    this.isExtension =
      typeof chrome !== "undefined" && chrome.storage !== undefined;
    this.indexedDBService = new IndexedDBService();
  }

  // Get method for ILinkItem keys and values
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
      return this.indexedDBService.get<ILinkItem[T]>(key as string);
    }
  }

  // Set method for ILinkItem keys and values
  async set<T extends keyof ILinkItem>(
    key: T,
    value: ILinkItem[]
  ): Promise<void> {
    if (this.isExtension) {
      return new Promise((resolve) => {
        chrome.storage.sync.set({ [key]: value }, resolve);
      });
    } else {
      return this.indexedDBService.set(key as string, value);
    }
  }
}

export const storage = new StorageService();
