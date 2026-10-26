/* Rootline storage: native IndexedDB, with localStorage fallback where needed. */
window.RootlineStorage = (() => {
  const DB_NAME = 'rootline-emotional-atlas';
  const STORE = 'snapshots';
  const KEY = 'rootline-v1';
  let db = null;
  let method = 'unavailable';

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('IndexedDB unavailable'));
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const next = req.result;
        if (!next.objectStoreNames.contains(STORE)) next.createObjectStore(STORE);
      };
      req.onsuccess = () => { db = req.result; db.onversionchange=()=>db.close(); resolve(db); };
      req.onerror = () => reject(req.error || new Error('Unable to open local database'));
      req.onblocked = () => reject(new Error('A different tab is keeping the database open'));
    });
  }

  async function init() {
    try { await openDatabase(); method='indexeddb'; return method; }
    catch {
      try { const token='__rootline_storage_test';localStorage.setItem(token,'yes');localStorage.removeItem(token);method='localstorage';return method; }
      catch { method='unavailable';return method; }
    }
  }

  function transact(mode, operation) {
    return new Promise((resolve,reject) => {
      const tx = db.transaction(STORE,mode);
      const req = operation(tx.objectStore(STORE));
      let value;
      req.onsuccess=()=>{value=req.result};
      req.onerror=()=>reject(req.error||new Error('Storage request failed'));
      tx.oncomplete=()=>resolve(value);
      tx.onerror=()=>reject(tx.error||new Error('Storage transaction failed'));
      tx.onabort=()=>reject(tx.error||new Error('Storage transaction aborted'));
    });
  }

  async function get(){
    if(method==='indexeddb')return (await transact('readonly', store=>store.get(KEY))) || null;
    if(method==='localstorage')return JSON.parse(localStorage.getItem(KEY)||'null');
    return null;
  }

  async function set(snapshot){
    if(method==='indexeddb')return transact('readwrite',store=>store.put(snapshot,KEY));
    if(method==='localstorage'){localStorage.setItem(KEY,JSON.stringify(snapshot));return true}
    throw new Error('Local storage unavailable');
  }

  async function clear(){
    if(method==='indexeddb')return transact('readwrite',store=>store.delete(KEY));
    if(method==='localstorage'){localStorage.removeItem(KEY);return true}
    throw new Error('Local storage unavailable');
  }

  return {init,get,set,clear,get method(){return method}};
})();
