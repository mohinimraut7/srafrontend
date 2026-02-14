import { openDB } from "idb"

export const initDB = async () => {
  return openDB("sra-drafts-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("drafts")) {
        db.createObjectStore("drafts", { keyPath: "id", autoIncrement: true })
      }
    },
  })
}

export const saveDraftToDB = async (values, files) => {
  const db = await initDB()

  await db.add("drafts", {
    formData: values,
    fileData: files,
    savedAt: new Date().toISOString(),
  })
}

export const getAllDrafts = async () => {
  const db = await initDB()
  return db.getAll("drafts")
}

export const getDraftById = async (id) => {
  const db = await initDB()
  return db.get("drafts", id)
}



