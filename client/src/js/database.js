import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDb = await openDB("jate", 1);
    // Above, we open our db and the version we want.

    const tx = jateDb.transaction("jate", "readwrite");
    // Above, we create a transaction with our userCode store and give it read and write privleges.

    const store = tx.objectStore("jate");
    // Above, we assign a store  called jate.

    const request = store.put({ id: 1, userCode: content });
    // Above, we use store.put to create and update a entry in index.db.
    // We give the entry a id of one and set the content here.
    // We do this becuase we only need one entry of the users code.

    const result = await request;
    console.log("Data saved to the database", result);
    // Above is our confirmation!
  } catch (error) {
    console.error("Error saving data to the database", error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  try{
  const todosDb = await openDB("jate", 1);
    // Above we open or desired db and version. 



  const tx = todosDb.transaction("jate", "readonly");
    // Above, we create a read only transaction.

  const store = tx.objectStore("jate");

  // Above, we assign a store to this entry called jate.

  const request = store.get(1);

  // Above, is where we get our created and updated entry with a request.

  const result = await request;

  // Above, we await our results.

  if (result && result.userCode) {
    

    console.log("result.value", result.userCode);
    return result.userCode;
  } else {
    console.log("result.value : None");
    return null;
  }


  // Above, is our if statment that passes the data over to editorjs.
  // If result and resllt.userCode are present we return result.userCode.
  // If either is not present we return null.



}catch(error) {
  console.error("Error saving data to the database", error);
  return null
  // Above is our catch 
}


};

initdb();

// Above we call initdb to create our indexdb and store.