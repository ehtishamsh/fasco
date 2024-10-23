# Fasco

Fasco is a full-stack eCommerce project with a robust architecture designed to deliver an engaging shopping experience. The frontend is built using modern web technologies like React.js, TypeScript, Redux, Shadcn UI, and Tailwind CSS, while Stripe powers the secure payment system. The backend, constructed with Node.js, Express.js, Multer, TypeScript, Supabase (for the database), and Prisma ORM, ensures seamless user interactions and data management.

## Live Demo
[Click on this Live Link](https://your-fasco-demo-link.com/)

## Technologies Used

### Frontend:
- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)

### Backend:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)
- [Prisma ORM](https://www.prisma.io/)

## Features

- **Product Browsing**: Users can view a wide range of products, search, and filter to find specific items.
- **Shopping Cart and Wishlist**: Add products to the cart or wishlist for later.
- **Order Placement**: Securely place orders through Stripe, ensuring a safe payment process.
- **User Accounts**: Registered users can manage their profiles, including:
  - Updating personal information.
  - Managing multiple shipping addresses.
  - Viewing order history and order details.
  - Tracking order status.
  - Canceling orders within 24 hours of placement.
- **Product Reviews**: Users can submit reviews for products they have purchased.
- **Admin Dashboard**: Admins can manage the product inventory, add or edit products, and track stock levels.
- **Search & Filtering**: Enhanced search functionality with product filtering by category, price, and other attributes.
- **Dynamic Pricing**: Prices adjust based on promotions or sales.
- **State Management**: Redux ensures robust state management for seamless user interactions.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/fasco-ecommerce.git
   cd fasco-ecommerce
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of your project and add the necessary variables:

   ```env
   DATABASE_URL= ""
   STRIPE_SECRET_KEY= ""
   SUPABASE_URL= ""
   SUPABASE_ANON_KEY= ""
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:4000](http://localhost:4000) in your browser.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to customize this documentation to better fit your project.
```

Let me know if you'd like any adjustments!
