import readline from "readline/promises";
import { stdin, stdout } from "process";
import { readFile, writeFile } from "fs/promises";

const FILE = "product.json";

// Get cart data
const getCart = async () => {
  const data = await readFile(FILE, "utf-8");
  return JSON.parse(data);
};

// Save cart data
const saveCart = async (myCart) => {
  await writeFile(FILE, JSON.stringify(myCart, null, 2));
};

// Add product
const addToCart = async (product) => {
  const myCart = await getCart();

  const isFound = myCart.find((item) => item.id === product.id);

  if (isFound) {
    isFound.qty += product.qty;
  } else {
    myCart.push(product);
  }

  await saveCart(myCart);

  console.log(`Product added/updated with id ${product.id}`);
};

// Show cart
const showCart = async () => {
  const myCart = await getCart();

  if (myCart.length === 0) {
    console.log("Cart is empty!");
    return;
  }

  console.table(myCart);
};

// Remove product
const removeProduct = async (id) => {
  const myCart = await getCart();

  const newCart = myCart.filter((item) => item.id !== id);

  if (newCart.length === myCart.length) {
    console.log(`Product with id ${id} not found!`);
    return;
  }

  await saveCart(newCart);

  console.log(`Product with id ${id} removed successfully!`);
};

// Update quantity
const updateQuantity = async (id, qty) => {
  const myCart = await getCart();

  const product = myCart.find((item) => item.id === id);

  if (!product) {
    console.log(`Product with id ${id} not found!`);
    return;
  }

  if (qty <= 0) {
    console.log("Quantity must be greater than 0!");
    return;
  }

  product.qty = qty;

  await saveCart(myCart);

  console.log(`Quantity updated for product ${id}`);
};

// Checkout
const checkout = async () => {
  const myCart = await getCart();

  if (myCart.length === 0) {
    console.log("Cart is empty!");
    return;
  }

  let total = 0;

  console.log("\n========== BILL ==========");

  myCart.forEach((item) => {
    const itemTotal = item.price * item.qty;

    console.log(`${item.name} | ₹${item.price} x ${item.qty} = ₹${itemTotal}`);

    total += itemTotal;
  });

  console.log("--------------------------");
  console.log(`Total Amount: ₹${total}`);
  console.log("==========================");

  await saveCart([]);

  console.log("Order placed successfully! 🎉");
  console.log("Cart has been cleared.");
};

// Main function
const main = async () => {
  let choice;

  const cin = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  do {
    console.log("\n================================");
    console.log("       Welcome to Flipkart 🤸");
    console.log("================================");
    console.log("1.......... Show Cart");
    console.log("2.......... Add Product");
    console.log("3.......... Remove Product");
    console.log("4.......... Update Quantity");
    console.log("5.......... Checkout");
    console.log("================================");

    choice = await cin.question("Enter your choice: ");

    switch (Number(choice)) {
      case 1:
        await showCart();
        break;

      case 2: {
        const data = await cin.question("Enter id,name,price,qty: ");

        const [id, name, price, qty] = data
          .split(",")
          .map((item) => item.trim());

        const product = {
          id: Number(id),
          name,
          price: Number(price),
          qty: Number(qty),
        };

        await addToCart(product);
        break;
      }

      case 3: {
        const id = await cin.question("Enter product id to remove: ");

        await removeProduct(Number(id));
        break;
      }

      case 4: {
        const id = await cin.question("Enter product id: ");

        const qty = await cin.question("Enter new quantity: ");

        await updateQuantity(Number(id), Number(qty));
        break;
      }

      case 5:
        await checkout();
        break;

      default:
        console.log("Invalid choice! Try again 🛑");
    }
  } while (Number(choice) !== 5);

  cin.close();
};

main();
