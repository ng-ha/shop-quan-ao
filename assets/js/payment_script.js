document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = cart.reduce((sum, item) => sum + (item.discount || item.price) * item.quantity, 0);

    document.getElementById("total-price").innerText = formatPrice(totalPrice);

    document.getElementById("payment-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        let order = {
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            notes: document.getElementById("notes").value,
            paymentMethod: document.getElementById("payment-method").value,
            totalPrice: totalPrice,
            cart: cart
        };

        await fetch(`${ENV.API_URL}/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });

        console.log("Đơn hàng:", order);

        alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");

        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });
});

function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
}