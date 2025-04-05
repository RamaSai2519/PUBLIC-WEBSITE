// utils/indexedDbUtils.ts

const DB_NAME = 'metaSLDB';
const DB_VERSION = 1;
const STORE_NAME = 'slUserMeta';

// Open or create the database
const openDb = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};

// Add data to the store
export const addItem = async (item: object) => {
    const db = await openDb();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(item);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

// Retrieve data from the store
export const getItems = async () => {
    const db = await openDb();
    return new Promise<any[]>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result[request.result.length - 1]);
        };

        request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

export const clearIndexedDB = () => {
    // const dbName = 'myDatabase'; // Replace with your IndexedDB name

    const request = indexedDB.deleteDatabase(DB_NAME);

    request.onsuccess = () => {
        // console.log(`IndexedDB ${DB_NAME} cleared successfully.`);
    };

    request.onerror = (event) => {
        console.error(`Error clearing IndexedDB ${DB_NAME}:`, (event.target as IDBRequest).error);
    };
};
