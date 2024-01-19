const { fetchMy } = require("./pgsql");

const renderParams = (num) => {
  let str = [];
  for (let i = 1; i <= num; i++) {
    str.push(`$${i}`);
  }
  return str.join();
};

const updateData = async (model, value, where) => {
  const res = { ok: false, data: null, msg: "" };
  try {
    let pgConstanta = 1;
    let modelKeys = [];
    const modelValues = [];
    let query = `update ${model} set `;
    if (Object.keys(value).length) {
      for (let i of Object.keys(value)) {
        modelKeys.push(`${i} = $${pgConstanta}`);
        pgConstanta++;
        modelValues.push(value[i]);
      }
      query += `  ${modelKeys.join()}`;
      modelKeys = [];
      if (where) {
        for (let i of Object.keys(where)) {
          modelKeys.push(`${i} = $${pgConstanta}`);
          pgConstanta++;
          modelValues.push(where[i]);
        }
        query += ` where ${modelKeys.join(" and ")} returning *`;
      } else {
        query += " returning *";
      }
      const result = await fetchMy(query, modelValues);
      res.ok = true;
      res.data = result;
      res.msg = "successfully updated";
      return res;
    }
    res.msg = "value not found";
    return res;
  } catch (e) {
    res.msg = String(e);
    return res;
  }
};
module.exports = updateData;
