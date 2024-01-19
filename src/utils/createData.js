const { fetchMy } = require("./pgsql");

const renderParams = (num) => {
  let str = [];
  for (let i = 1; i <= num; i++) {
    str.push(`$${i}`);
  }
  return str.join();
};

const createData = async (model, value) => {
  const res = { ok: false, data: null, msg: "" };
  try {
    const modelKeys = [];
    const modelValues = [];
    for (let i of Object.keys(value)) {
      modelKeys.push(i);
      modelValues.push(value[i]);
    }
    const query = `insert into ${model}(${modelKeys.join()}) values(${renderParams(
      modelKeys.length
    )}) returning *`;
    const result = await fetchMy(query, modelValues);
    res.ok = true;
    res.data = result;
    res.msg = "successfully created";
    return res;
  } catch (e) {
    res.msg = String(e);
    return res;
  }
};
module.exports = createData;
