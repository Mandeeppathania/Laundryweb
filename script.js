emailjs.init("LW86rP26ry3v5GI48");
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
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    if(totalAmount === 0)
    {
        alert("Please add at least one service.");
        return;
    }
    if(name === "" || email === "" || phone === "")
    {
        alert("Please fill all fields.");
        return;
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email))
    {
        alert("Please enter a valid email address.");
        return;
    }
    if(phone.length !== 10 || isNaN(phone))
    {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }
    emailjs.send(
        "service_4cbu9nr",
        "template_k4812ba",
        {
            user_name: name,
            user_email: email,
            user_phone: phone,
            total_amount: totalAmount
        }
    )
    .then(function(response)
    {
        document.getElementById("message").innerHTML =
        "Thank you for booking the service. We will get back to you soon!";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("cartItems").innerHTML = "";
        totalAmount = 0;
        serialNumber = 1;
        document.getElementById("total").innerText = "0";
        console.log("Email sent successfully", response);
    })
    .catch(function(error)
    {
        console.log("EmailJS Error:", error);
        alert("Failed to send email. Please try again.");
    });
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
function scrollToBooking()
{
    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function subscribeNewsletter()
{
    let name =
        document.getElementById(
            "subscriberName"
        ).value;

    let email =
        document.getElementById(
            "subscriberEmail"
        ).value;

    if(name === "" || email === "")
    {
        alert(
            "Please enter your name and email."
        );

        return;
    }

    document.getElementById(
        "subscribeMessage"
    ).innerText =
    "Thank you for subscribing to our newsletter!";

    document.getElementById(
        "subscriberName"
    ).value = "";

    document.getElementById(
        "subscriberEmail"
    ).value = "";
}