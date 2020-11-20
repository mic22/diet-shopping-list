function run() {
  const input_data = document.querySelector("#input").value.split("\n");

  const data = input_data.map(line => {
    try {
      let tmp = line.trim().split(" (");
  
      let tmp2 = tmp[0].split(" ");
      let tmp3 = tmp2.pop();
      let unit = tmp3.includes("g") ? "g" : "ml";
      let quantity = parseInt(tmp3.replace(unit, ""));
      let name = tmp2.join(" ");
      let desc = tmp[1].replace(")", "");
      
      return { name, quantity, unit, desc }
    } catch (e) {
      return false
    }
  });

  const result = {};

  data.filter(item => item).forEach(({ name, quantity, unit, desc }) => {
    if (!result[name]) {
      result[name] = {
        quantity: 0,
        unit,
        desc: []
      };
    }

    result[name].quantity += quantity;
    result[name].desc.push(desc);
  });

  const output = document.querySelector("#result");
  output.innerHTML = "";

  Object.entries(result).forEach(([key, value], index) => {
    const li = document.createElement("div");
    li.innerHTML = `
      <input type="checkbox" id="item_${index}" checked />
      <label for="item_${index}">
        <strong>${key}</strong> - ${value.quantity}${value.unit} - (${value.desc.join("; ")})
      </label>
    `

    output.append(li);
  })
}
