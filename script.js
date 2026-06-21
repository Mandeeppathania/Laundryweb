emailjs.init("LW86rP26ry3v5GI48");// EmailJS public key used for sending booking confirmation emails
let totalAmount = 0;// Stores current total bill amount
let serialNumber = 1;// Used to generate serial numbers in cart table
//function to add item into cart
function addItem(serviceName, price)
{
    let cart =
        document.getElementById("cartItems");//getting element with id:cartItems
    let row =
        document.createElement("tr");//this will store info about the item to be added in the table creatd for cart 
    row.innerHTML = `
        <td>${serialNumber}</td>
        <td>${serviceName}</td>
        <td>₹${price}</td>
    `;
    cart.appendChild(row);//element added into cart
    totalAmount += price;//price of item added to provide the total amount after adding item
    document.getElementById("total")
        .innerText = totalAmount;//price updated after adding
    serialNumber++;
}
// Removes the latest matching service from the cart
function removeItem(serviceName, price)
{
    let rows =
        document.querySelectorAll(
            "#cartItems tr"
        );

    // Start from last row
    for(let i = rows.length - 1; i >= 0; i--)
    {
        let serviceCell =
            rows[i].children[1];
        // Check if service name matches
        if(serviceCell.innerText === serviceName)
        {
            rows[i].remove();
            //deduct from total
            totalAmount -= price;
            if(totalAmount < 0)// Prevent negative total
            {
                totalAmount = 0;
            }
            document.getElementById("total")
                .innerText = totalAmount;
            updateSerialNumbers(); // Reassign serial numbers after deletion
            return;
        }
    }
    alert("No such item found in cart.");
}
// Validates booking form and sends confirmation email
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
    if(name === "" || email === "" || phone === "")// Check if any input is empty
    {
        alert("Please fill all fields.");//provide the alert
        return;
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//cheking for valid email

    if(!emailPattern.test(email))
    {
        alert("Please enter a valid email address.");//alert for email
        return;
    }
    if(phone.length !== 10 || isNaN(phone))//check for length of number it should have 10 digits
    {
        alert("Please enter a valid 10-digit phone number.");//alert
        return;
    }
    emailjs.send(
        "service_4cbu9nr",//service id from email,js
        "template_k4812ba",// emplate id from email.js
        {
            user_name: name,
            user_email: email,
            user_phone: phone,
            total_amount: totalAmount
        }
    )
    .then(function(response)//this will be sent to the user
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
    .catch(function(error)//for any error
    {
        console.log("EmailJS Error:", error);
        alert("Failed to send email. Please try again.");
    });
}
// Updates serial numbers after item deletion
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
// Takes the user directly to the booking section
function scrollToBooking()
{
    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// Handles newsletter subscription
function subscribeNewsletter()
{
    let name =
        document.getElementById(
            "subscriberName"
        ).value.trim();
    let email =
        document.getElementById(
            "subscriberEmail"
        ).value.trim();
    // Check if fields are empty
    if(name === "")
    {
        alert(
            "Please enter your name."
        );

        return;
    }
    if(email === "")
    {
        alert(
            "Please enter your email."
        );
        return;
    }
    // Basic email validation
    if(
        !email.includes("@") ||
        !email.includes(".")
    )
    {
        alert(
            "Please enter a valid email address."
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