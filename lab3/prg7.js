const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // =========================
  // HOME PAGE
  // =========================
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>NovaCore | Business Solutions</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: #f5f7fb;
            color: #172033;
        }

        nav {
            height: 70px;
            background: #111827;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 7%;
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .logo {
            color: white;
            font-size: 25px;
            font-weight: bold;
        }

        .logo span {
            color: #38bdf8;
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }

        nav ul li a {
            color: #dbeafe;
            text-decoration: none;
            font-size: 15px;
        }

        nav ul li a:hover {
            color: #38bdf8;
        }

        .hero {
            min-height: 600px;
            padding: 80px 7%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 50px;
            background: linear-gradient(135deg, #111827, #1e3a8a);
            color: white;
        }

        .hero-content {
            max-width: 600px;
        }

        .badge {
            display: inline-block;
            background: rgba(56,189,248,0.15);
            border: 1px solid #38bdf8;
            padding: 10px 18px;
            border-radius: 30px;
            color: #7dd3fc;
            font-size: 13px;
            margin-bottom: 25px;
        }

        .hero h1 {
            font-size: 60px;
            line-height: 1.1;
            margin-bottom: 25px;
        }

        .hero h1 span {
            color: #38bdf8;
        }

        .hero p {
            font-size: 18px;
            line-height: 1.7;
            color: #dbeafe;
            margin-bottom: 35px;
        }

        .buttons {
            display: flex;
            gap: 15px;
        }

        .btn {
            padding: 15px 25px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
        }

        .primary {
            background: #38bdf8;
            color: #082f49;
        }

        .secondary {
            border: 1px solid #94a3b8;
            color: white;
        }

        .dashboard {
            width: 430px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            padding: 25px;
            backdrop-filter: blur(10px);
        }

        .dashboard-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
        }

        .status {
            color: #4ade80;
        }

        .chart {
            height: 180px;
            border-radius: 12px;
            background: linear-gradient(
                160deg,
                rgba(56,189,248,0.25),
                rgba(99,102,241,0.25)
            );
            display: flex;
            align-items: end;
            justify-content: space-around;
            padding: 20px;
        }

        .bar {
            width: 35px;
            background: #38bdf8;
            border-radius: 6px 6px 0 0;
        }

        .bar:nth-child(1) { height: 40%; }
        .bar:nth-child(2) { height: 65%; }
        .bar:nth-child(3) { height: 50%; }
        .bar:nth-child(4) { height: 85%; }
        .bar:nth-child(5) { height: 100%; }

        .stats {
            padding: 60px 7%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            background: white;
        }

        .stat {
            text-align: center;
            padding: 20px;
        }

        .stat h2 {
            color: #2563eb;
            font-size: 35px;
            margin-bottom: 8px;
        }

        .stat p {
            color: #64748b;
        }

        .section {
            padding: 80px 7%;
        }

        .section-title {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-title h2 {
            font-size: 38px;
            margin-bottom: 12px;
        }

        .section-title p {
            color: #64748b;
            font-size: 17px;
        }

        .products {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
        }

        .card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: 0.3s;
        }

        .card:hover {
            transform: translateY(-8px);
        }

        .icon {
            width: 55px;
            height: 55px;
            background: #dbeafe;
            color: #2563eb;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px;
            margin-bottom: 20px;
        }

        .card h3 {
            font-size: 22px;
            margin-bottom: 12px;
        }

        .card p {
            color: #64748b;
            line-height: 1.6;
        }

        .cta {
            margin: 40px 7% 80px;
            padding: 60px;
            border-radius: 20px;
            background: linear-gradient(135deg, #2563eb, #0f172a);
            color: white;
            text-align: center;
        }

        .cta h2 {
            font-size: 40px;
            margin-bottom: 15px;
        }

        .cta p {
            color: #dbeafe;
            margin-bottom: 25px;
        }

        footer {
            background: #111827;
            color: #cbd5e1;
            padding: 35px 7%;
            text-align: center;
        }

        footer h3 {
            color: white;
            margin-bottom: 10px;
        }

        @media(max-width: 900px) {
            .hero {
                flex-direction: column;
                text-align: center;
            }

            .buttons {
                justify-content: center;
            }

            .stats {
                grid-template-columns: repeat(2, 1fr);
            }

            .products {
                grid-template-columns: 1fr;
            }

            nav ul {
                display: none;
            }
        }

        @media(max-width: 600px) {
            .hero h1 {
                font-size: 40px;
            }

            .dashboard {
                width: 100%;
            }

            .stats {
                grid-template-columns: 1fr;
            }

            .cta {
                margin-left: 4%;
                margin-right: 4%;
                padding: 40px 20px;
            }
        }
    </style>
</head>

<body>

    <nav>
        <div class="logo">Nova<span>Core</span></div>

        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/product">Products</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="/enquiry">Product Enquiry</a></li>
        </ul>
    </nav>


    <section class="hero">

        <div class="hero-content">

            <div class="badge">
                NEXT-GENERATION BUSINESS SOLUTIONS
            </div>

            <h1>
                Build Smarter.<br>
                Work <span>Better.</span>
            </h1>

            <p>
                Discover innovative products and powerful solutions
                designed to help your business grow, perform and succeed.
            </p>

            <div class="buttons">
                <a href="/enquiry" class="btn primary">
                    Get a Product Quote →
                </a>

                <a href="/product" class="btn secondary">
                    Explore Products
                </a>
            </div>

        </div>


        <div class="dashboard">

            <div class="dashboard-header">
                <strong>Business Dashboard</strong>
                <span class="status">● Live</span>
            </div>

            <div class="chart">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>

            <br>

            <p>Performance Overview</p>
            <h2>+28.6%</h2>

        </div>

    </section>


    <section class="stats">

        <div class="stat">
            <h2>500+</h2>
            <p>Happy Customers</p>
        </div>

        <div class="stat">
            <h2>120+</h2>
            <p>Products</p>
        </div>

        <div class="stat">
            <h2>98%</h2>
            <p>Customer Satisfaction</p>
        </div>

        <div class="stat">
            <h2>24/7</h2>
            <p>Customer Support</p>
        </div>

    </section>


    <section class="section">

        <div class="section-title">
            <h2>Our Featured Products</h2>
            <p>Powerful products built for modern businesses.</p>
        </div>

        <div class="products">

            <div class="card">
                <div class="icon">⚡</div>
                <h3>NovaPro X1</h3>
                <p>
                    High-performance business technology
                    designed for demanding workloads.
                </p>
            </div>

            <div class="card">
                <div class="icon">⚙</div>
                <h3>SmartCore 500</h3>
                <p>
                    Smart and efficient solutions that
                    simplify everyday business operations.
                </p>
            </div>

            <div class="card">
                <div class="icon">🚀</div>
                <h3>PowerMax Ultra</h3>
                <p>
                    Advanced performance and reliability
                    for growing organizations.
                </p>
            </div>

        </div>

    </section>


    <section class="section" id="features">

        <div class="section-title">
            <h2>Why Choose NovaCore?</h2>
            <p>Everything you need to move your business forward.</p>
        </div>

        <div class="products">

            <div class="card">
                <div class="icon">✓</div>
                <h3>Reliable Quality</h3>
                <p>
                    Dependable products built with quality
                    and performance in mind.
                </p>
            </div>

            <div class="card">
                <div class="icon">★</div>
                <h3>Expert Support</h3>
                <p>
                    Get professional assistance whenever
                    you need it.
                </p>
            </div>

            <div class="card">
                <div class="icon">↗</div>
                <h3>Business Growth</h3>
                <p>
                    Solutions designed to help organizations
                    achieve better results.
                </p>
            </div>

        </div>

    </section>


    <section class="cta">

        <h2>Ready to Find the Right Product?</h2>

        <p>
            Tell us what you need and our team will help
            you find the perfect solution.
        </p>

        <a href="/enquiry" class="btn primary">
            Start Product Enquiry →
        </a>

    </section>


    <footer>

        <h3>NovaCore Solutions</h3>

        <p>
            Business Technology & Product Solutions
        </p>

        <br>

        <p>
            Email: hello@novacore.in |
            Phone: +91 98765 43210
        </p>

        <br>

        <p>
            © 2026 NovaCore Solutions. All Rights Reserved.
        </p>

    </footer>

</body>
</html>
        `);
  }

  // =========================
  // PRODUCT PAGE
  // =========================
  else if (req.url === "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const stream = fs.createReadStream("product.html", {
      encoding: "utf-8",
    });

    stream.on("error", () => {
      res.statusCode = 500;
      res.end("Unable to load product.html");
    });

    stream.pipe(res);
  }

  // =========================
  // ENQUIRY PAGE
  // =========================
  else if (req.url === "/enquiry") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const stream = fs.createReadStream("enquiry.html", {
      encoding: "utf-8",
    });

    stream.on("error", () => {
      res.statusCode = 500;
      res.end("Unable to load enquiry.html");
    });

    stream.pipe(res);
  }

  // =========================
  // 404 PAGE
  // =========================
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });

    res.end(`
            <html>
                <head>
                    <title>404</title>
                </head>

                <body style="
                    font-family: Arial;
                    text-align: center;
                    padding: 100px;
                ">

                    <h1>404 - Page Not Found</h1>

                    <p>
                        The page you are looking for does not exist.
                    </p>

                    <a href="/">
                        Go Back Home
                    </a>

                </body>
            </html>
        `);
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
