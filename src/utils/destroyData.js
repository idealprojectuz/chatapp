const { fetchMy } = require("./pgsql");

const destroyData = async (model, where, select = []) => {
  try {
    const modelKeys = [];
    const modelValues = [];
    let query = `delete from ${model}`;
    if (where) {
      for (let i of Object.keys(where)) {
        modelKeys.push(`${i} = $${modelKeys.length + 1}`);
        modelValues.push(where[i]);
      }
      query += ` where ${modelKeys.join(" and ")} returning  ${
        select.length ? select.join(", ") : "*"
      }`;
    }

    const result = await fetchMy(
      query,
      modelValues.length ? modelValues : null
    );
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};
module.exports = destroyData;
