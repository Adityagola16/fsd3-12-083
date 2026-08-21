import readline from "readline/promises";
import { stdin, stdout } from "process";
import { readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Get current folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// product.json is in the same folder as index.js
const FILE = join(__dirname, "product.json");

// ===============================
// GET CART
// ===============================
const getCart = async () => {
  const data = await readFile(FILE, "utf-8");
  return JSON.parse(data);
};

// ===============================
// SAVE CART
// ===============================
const saveCart = async (myCart) => {
  await writeFile(FILE, JSON.stringify(myCart, null, 2));
};

// ===============================
// ADD PRODUCT
// ===============================
const addToCart = async (product) => {
  const myCart = await getCart();

  const isFound = myCart.find((item) => item.id === product.id);

  if (isFound) {
    isFound.qty += product.qty;
  } else {
    myCart.push(product);
  }

  await saveCart(myCart);

  console.log(`Product added/updated with id ${product.id} into cart`);
};

// ===============================
// SHOW CART
// ===============================
const showCart = async () => {
  const data = await getCart();

  if (data.length === 0) {
    console.log("\nYour cart is empty!");
    return;
  }

  console.log("\n========== YOUR CART ==========");

  console.table(data);

  let total = 0;

  for (let i = 0; i < data.length; i++) {
    total += data[i].price * data[i].qty;
  }

  console.log("===============================");
  console.log(`TOTAL AMOUNT TO PAY: ₹${total}`);
  console.log("===============================\n");
};
const removeFromCart = async (pid) => {
  const myCart = await getCart();
  const index = myCart.findIndex((item) => item.id === pid);
  if (index === -1) {
    console.log(`Product with id ${pid} not found!`);
    return;
  }
  myCart.splice(index, 1);
  await saveCart(myCart);
  console.log(`Product with id ${pid} removed from cart.`);
};

// ===============================
// REMOVE PRODUCT
// ===============================
const removeProduct = async (id) => {
  const myCart = await getCart();

  const index = myCart.findIndex((item) => item.id === id);

  if (index === -1) {
    console.log(`Product with id ${id} not found!`);
    return;
  }

  const removedProduct = myCart.splice(index, 1);

  await saveCart(myCart);

  console.log(`Product "${removedProduct[0].name}" removed successfully!`);
};

// ===============================
// UPDATE QUANTITY
// ===============================
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

  console.log(`Quantity of "${product.name}" updated to ${qty}`);
};

// ===============================
// CHECKOUT
// ===============================
const checkout = async (cin) => {
  const data = await getCart();

  if (data.length === 0) {
    console.log("\nYour cart is empty!");
    return;
  }

  let total = 0;

  console.log("\n========== CHECKOUT ==========");

  for (let i = 0; i < data.length; i++) {
    const itemTotal = data[i].price * data[i].qty;

    console.log(
      `${data[i].name} | ₹${data[i].price} × ${data[i].qty} = ₹${itemTotal}`,
    );

    total += itemTotal;
  }

  console.log("------------------------------");
  console.log(`TOTAL AMOUNT TO PAY: ₹${total}`);
  console.log("==============================");

  const confirm = await cin.question(
    "Do you want to place the order? (yes/no): ",
  );

  if (confirm.toLowerCase() === "yes") {
    await saveCart([]);

    console.log("\nOrder placed successfully! 🎉");
    console.log(`Amount paid: ₹${total}`);
    console.log("Thank you for shopping with Flipkart!");
  } else {
    console.log("\nOrder cancelled.");
  }
};

// ===============================
// MAIN FUNCTION
// ===============================
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
      // =========================
      // SHOW CART
      // =========================
      case 1:
        await showCart();
        break;

      // =========================
      // ADD PRODUCT
      // =========================
      case 2: {
        const data = await cin.question("Enter id,name,price,qty: ");

        const [id, name, price, qty] = data
          .split(",")
          .map((item) => item.trim());

        const product = {
          id: Number(id),
          name: name,
          price: Number(price),
          qty: Number(qty),
        };

        await addToCart(product);

        break;
      }

      // =========================
      // REMOVE PRODUCT
      // =========================
      case 3: {
        const id = await cin.question("Enter product id to remove: ");

        await removeProduct(Number(id));

        break;
      }

      // =========================
      // UPDATE QUANTITY
      // =========================
      case 4: {
        const id = await cin.question("Enter product id: ");

        const qty = await cin.question("Enter new quantity: ");

        await updateQuantity(Number(id), Number(qty));

        break;
      }

      // =========================
      // CHECKOUT
      // =========================
      case 5:
        await checkout(cin);
        console.log("\nSee you later 👋");
        break;

      // =========================
      // INVALID CHOICE
      // =========================
      default:
        console.log("Invalid choice! Try again 🛑");
    }
  } while (Number(choice) !== 5);

  cin.close();
};

// Start program
main();
