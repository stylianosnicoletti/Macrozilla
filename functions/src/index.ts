import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

/* To deploy:
 *  ------------
 *  WARNING: Watch cloud storage bandwidth (deployments of functions cost !!!!!)
 *  firebase deploy --only functions
 */

/* To Test:
 *  -----------
 *  npm install
 *  npm run-script build
 *  firebase emulators:start
 */

admin.initializeApp();

// Creating user fields on user creation (Production)
exports.createNewUserFields = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection("TheMacroDiet/Production/Users")
    .doc(user.uid)
    .set({
      Options: {
        DarkMode: false,
        UseOnlyPersonalDb: false,
        TransferEntriesEnabled: true,
      },
      Sizes: {
        DailyEntries: 0,
      },
    });
});

// Creating new food in USER DB (Production)
exports.createUserFoodNameIndex = functions
  .region("europe-west3")
  .firestore.document(
    "TheMacroDiet/Production/Users/{userDoc}/FoodDatabase/{foodDoc}"
  )
  .onCreate(async (snap, context) => {
    const foodDoc = context.params.foodDoc;
    const foodObject = snap.data();

    console.log(
      "Creation triggered on User Db for Food document: '" +
        foodDoc +
        "', with Name field: '" +
        foodObject.Name +
        "'."
    );

    const searchableFoodNameIndex = createSearchableFoodNameIndex(
      foodObject.Name
    );
    const indexedFood = { ...foodObject, searchableFoodNameIndex };

    const db = admin.firestore();
    return await db.doc(snap.ref.path).set(indexedFood, { merge: true });
  });

// Creating new food in GLOBAL DB (Production)
exports.createGlobalFoodNameIndex = functions
  .region("europe-west3")
  .firestore.document("/TheMacroDiet/Production/GlobalFoodDatabase/{foodDoc}")
  .onCreate(async (snap, context) => {
    const foodDoc = context.params.foodDoc;
    const foodObject = snap.data();

    console.log(
      "Creation triggered on Global Db for Food document: '" +
        foodDoc +
        "', with Name field: '" +
        foodObject.Name +
        "'."
    );

    const searchableFoodNameIndex = createSearchableFoodNameIndex(
      foodObject.Name
    );
    const indexedFood = { ...foodObject, searchableFoodNameIndex };

    const db = admin.firestore();
    return await db.doc(snap.ref.path).set(indexedFood, { merge: true });
  });

// Editing existing in USER DB (Production)
exports.editUserFoodNameIndex = functions
  .region("europe-west3")
  .firestore.document(
    "TheMacroDiet/Production/Users/{userDoc}/FoodDatabase/{foodDoc}"
  )
  .onUpdate(async (change, context) => {
    const foodDoc = context.params.foodDoc;
    const foodObjectBefore = change.before.data();
    const foodObjectAfter = change.after.data();

    if (foodObjectBefore.Name != foodObjectAfter.Name) {
      console.log(
        "Edit triggered on User Db for Food document: '" +
          foodDoc +
          "'. Changing Name field from '" +
          foodObjectBefore.Name +
          "' to '" +
          foodObjectAfter.Name +
          "'."
      );

      const searchableFoodNameIndex = createSearchableFoodNameIndex(
        foodObjectAfter.Name
      );
      const indexedFood = { ...foodObjectAfter, searchableFoodNameIndex };

      const db = admin.firestore();
      return await db.doc(change.after.ref.path).update(indexedFood);
    }

    console.log(
      "Edit triggered on User Db for Food document: '" +
        foodDoc +
        "'. No changes made in Name field."
    );
    return false;
  });

// Editing existing in GLOBAL DB (Production)
exports.editGlobalFoodNameIndex = functions
  .region("europe-west3")
  .firestore.document("/TheMacroDiet/Production/GlobalFoodDatabase/{foodDoc}")
  .onUpdate(async (change, context) => {
    const foodDoc = context.params.foodDoc;
    const foodObjectBefore = change.before.data();
    const foodObjectAfter = change.after.data();

    if (foodObjectBefore.Name != foodObjectAfter.Name) {
      console.log(
        "Edit triggered on Global Db for Food document: '" +
          foodDoc +
          "'. Changing Name field from '" +
          foodObjectBefore.Name +
          "' to '" +
          foodObjectAfter.Name +
          "'."
      );

      const searchableFoodNameIndex = createSearchableFoodNameIndex(
        foodObjectAfter.Name
      );
      const indexedFood = { ...foodObjectAfter, searchableFoodNameIndex };

      const db = admin.firestore();
      return await db.doc(change.after.ref.path).update(indexedFood);
    }

    console.log(
      "Edit triggered on Global Db for Food document: '" +
        foodDoc +
        "'. No changes made in Name field."
    );
    return false;
  });
/*
// Creating new food in USER DB (Testing)
exports.createUserFoodNameIndexTesting = functions
    .region('europe-west3').firestore
    .document('TheMacroDiet/Testing/Users/{userDoc}/FoodDatabase/{foodDoc}')
    .onCreate(async (snap, context) => {

        const foodDoc = context.params.foodDoc;
        const foodObject = snap.data();

        console.log("Testing Creation triggered on User Db for Food document: '" + foodDoc + "', with Name field: '" + foodObject.Name + "'.");

        const searchableFoodNameIndex = createSearchableFoodNameIndex(foodObject.Name);
        const indexedFood = { ...foodObject, searchableFoodNameIndex };

        const db = admin.firestore();
        return await db.doc(snap.ref.path).set(indexedFood, { merge: true })
    });

// Creating new food in GLOBAL DB (Testing)
exports.createGlobalFoodNameIndexTesting = functions
    .region('europe-west3').firestore
    .document('/TheMacroDiet/Testing/GlobalFoodDatabase/{foodDoc}')
    .onCreate(async (snap, context) => {

        const foodDoc = context.params.foodDoc;
        const foodObject = snap.data();

        console.log("Testing Creation triggered on Global Db for Food document: '" + foodDoc + "', with Name field: '" + foodObject.Name + "'.");

        const searchableFoodNameIndex = createSearchableFoodNameIndex(foodObject.Name);
        const indexedFood = { ...foodObject, searchableFoodNameIndex };

        const db = admin.firestore();
        return await db.doc(snap.ref.path).set(indexedFood, { merge: true })
    });

// Editing existing in USER DB (Testing)
exports.editUserFoodNameIndexTesting = functions
    .region('europe-west3').firestore
    .document('TheMacroDiet/Testing/Users/{userDoc}/FoodDatabase/{foodDoc}')
    .onUpdate(async (change, context) => {

        const foodDoc = context.params.foodDoc;
        const foodObjectBefore = change.before.data();
        const foodObjectAfter = change.after.data();

        if (foodObjectBefore.Name != foodObjectAfter.Name) {
            console.log("Testing Edit triggered on User Db for Food document: '" + foodDoc + "'. Changing Name field from '" + foodObjectBefore.Name + "' to '" + foodObjectAfter.Name + "'.");

            const searchableFoodNameIndex = createSearchableFoodNameIndex(foodObjectAfter.Name);
            const indexedFood = { ...foodObjectAfter, searchableFoodNameIndex };

            const db = admin.firestore();
            return await db.doc(change.after.ref.path).update(indexedFood);
        }

        console.log("Testing Edit triggered on User Db for Food document: '" + foodDoc + "'. No changes made in Name field.");
        return false;
    });

// Editing existing in GLOBAL DB (Testing)
exports.editGlobalFoodNameIndexTesting = functions
    .region('europe-west3').firestore
    .document('/TheMacroDiet/Testing/GlobalFoodDatabase/{foodDoc}')
    .onUpdate(async (change, context) => {

        const foodDoc = context.params.foodDoc;
        const foodObjectBefore = change.before.data();
        const foodObjectAfter = change.after.data();

        if (foodObjectBefore.Name != foodObjectAfter.Name) {
            console.log("Testing Edit triggered on Global Db for Food document: '" + foodDoc + "'. Changing Name field from '" + foodObjectBefore.Name + "' to '" + foodObjectAfter.Name + "'.");

            const searchableFoodNameIndex = createSearchableFoodNameIndex(foodObjectAfter.Name);
            const indexedFood = { ...foodObjectAfter, searchableFoodNameIndex };

            const db = admin.firestore();
            return await db.doc(change.after.ref.path).update(indexedFood);
        }

        console.log("Testing Edit triggered on Global Db for Food document: '" + foodDoc + "'. No changes made in Name field.");
        return false;
    });
*/

/**
 * Creates a searchable index collection of all possible combinations.
 * @param {string} foodName Name field value.
 * @return {any} Collection of all possible combinations.
 */
function createSearchableFoodNameIndex(foodName: string): any {
  const searchableIndex: any = {};

  let wholeName = foodName.toLocaleLowerCase().split("");
  while (wholeName.length > 0) {
    let prevKey = "";
    for (const char of wholeName) {
      const key = prevKey + char;
      searchableIndex[key] = true;
      prevKey = key;
    }
    wholeName.shift();
  }
  return searchableIndex;
}
