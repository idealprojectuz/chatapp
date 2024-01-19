const { fetchMy } = require("./pgsql");

const readData = async (model, where, select = []) => {
  try {
    const modelKeys = [];
    const modelValues = [];
    let query = `select ${
      select.length ? select.join(", ") : "*"
    } from ${model}`;
    if (where) {
      for (let i of Object.keys(where)) {
        modelKeys.push(`${i} = $${modelKeys.length + 1}`);
        modelValues.push(where[i]);
      }
      query += ` where ${modelKeys.join(" and ")}`;
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
module.exports = readData;
