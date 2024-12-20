/* global chrome */

class IndexedDBService {
  constructor(dbName = 'StorageDB', storeName = 'StorageStore') {
    this.dbName = dbName;
    this.storeName = storeName;
    this.init();
  }

  // Initialize IndexedDB
  async init() {
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
  async set(key, value) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Get a value from IndexedDB
  async get(key) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

class StorageService {
  constructor() {
    this.isExtension =
      typeof window !== 'undefined' &&
      typeof chrome !== 'undefined' &&
      chrome.storage !== undefined;
    this.indexedDBService = new IndexedDBService();
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
      return this.indexedDBService.get(key);
    }
  }

  // Set method for storing values
  async set(key, value) {
    if (this.isExtension) {
      return new Promise((resolve) => {
        chrome.storage.sync.set({ [key]: value }, resolve);
      });
    } else {
      await this.indexedDBService.set(key, value);
    }
  }
}

export const storage = new StorageService();
