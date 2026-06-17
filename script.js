let totalAmount = 0;
let serialNumber = 1;

function addItem(serviceName, price)
{
    let cart =
        document.getElementById("cartItems");
    let row =
        document.createElement("tr");
    row.innerHTML = `
        <td>${serialNumber}</td>
        <td>${serviceName}</td>
        <td>₹${price}</td>
    `;
    cart.appendChild(row);
    totalAmount += price;
    document.getElementById("total")
        .innerText = totalAmount;
    serialNumber++;
}