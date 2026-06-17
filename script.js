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

function removeItem(serviceName, price)
{
    let rows =
        document.querySelectorAll(
            "#cartItems tr"
        );
    for(let row of rows)
    {
        let serviceCell =
            row.children[1];
        if(
            serviceCell.innerText ===
            serviceName
        )
        {
            row.remove();
            updateSerialNumbers();
            totalAmount = Math.max( 0,totalAmount - price);
            document.getElementById(
                "total"
            ).innerText =
            totalAmount;
            break;
        }
    }
}
function bookService()
{
    let name =
        document.getElementById(
            "name"
        ).value;
    let email =
        document.getElementById(
            "email"
        ).value;
    let phone =
        document.getElementById(
            "phone"
        ).value;
    if(totalAmount === 0)
    {
        alert(
            "Please add at least one service"
        );
        return;
    }
    if(
        name === "" ||
        email === "" ||
        phone === ""
    )
    {
        alert(
            "Please fill all fields"
        );
        return;
    }
    let emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(
        !emailPattern.test(email)
    )
    {
        alert(
            "Enter valid email"
        );
        return;
    }
    if(phone.length !== 10)
    {
        alert(
            "Phone must contain 10 digits"
        );
        return;
    }
    document.getElementById(
        "message"
    ).innerHTML =
    "Thank you for booking the service. We will get back to you soon!";
    document.getElementById(
        "name"
    ).value = "";
    document.getElementById(
        "email"
    ).value = "";
    document.getElementById(
        "phone"
    ).value = "";
}
function updateSerialNumbers()
{
    let rows =
        document.querySelectorAll(
            "#cartItems tr"
        );
    let count = 1;
    rows.forEach(row =>
    {
        row.children[0].innerText =
            count++;
    });
}
