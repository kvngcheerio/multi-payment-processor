const requestTypes = {
  POST: "POST",
  GET: "GET",
};

const makeApiCall = async (callObject) => {
  let { url, method, headers, data } = callObject;

  if (!url) {
    throw "No url provided";
  }

  if (!method) {
    throw `Method must be one of ${Object.keys(requestTypes).join(", ")}`;
  }

  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };

  const val = !!data
    ? { body: typeof data !== "string" ? JSON.stringify(data) : data }
    : {};

  const req = await fetch(url, {
    method: method,
    headers: headers,
    ...val,
  });

  if (!req.ok) {
    throw await req.json();
  }

  return req.json();
};

module.exports = {
  makeApiCall,
  requestTypes,
};
