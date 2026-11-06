// FoodFleet – MongoDB Atlas queries and CRUD operations
// AML 2503 – SQL & NoSQL Database Design, Assignment 2 (Winter 2026), Group 2
// Run in mongosh against the FoodFleet database. Collections: users, restaurants,
// orders, drivers, order_logs, notifications.

// ------------------------------------------------------------------ 10 key queries

// 1. Retrieve all ongoing deliveries for a user
db.orders.find({
  user_id: "U001",
  delivery_status: { $in: ["preparing", "picked_up", "out_for_delivery"] }
})

// 2. Find all gluten-free dinner options across restaurants
db.restaurants.find(
  {
    "menus.category": "Dinner",
    "menus.items.dietary_tags": "gluten-free"
  },
  {
    name: 1,
    "menus.$": 1
  }
)

// 3. Show all order status updates for a specific group order
db.order_logs.find({ order_id: "O003" }).sort({ timestamp: 1 })

// 4. Find all orders assigned to a specific driver
db.orders.find({ driver_id: "D001" })

// 5. Retrieve unread notifications for a user
db.notifications.find({
  user_id: "U001",
  is_read: false
})

// 6. Find restaurants open now
db.restaurants.find({ is_active: true })

// 7. Get all vegetarian items from a specific restaurant
db.restaurants.find(
  { restaurant_id: "R001" },
  { name: 1, "menus.items": 1 }
)

// 8. Count orders per restaurant
db.orders.aggregate([
  { $unwind: "$restaurants" },
  { $group: { _id: "$restaurants", total_orders: { $sum: 1 } } }
])

// 9. Find top-rated available drivers
db.drivers.find({
  availability: true
}).sort({ rating: -1 })

// 10. Retrieve a user's complete order history
db.orders.find({ user_id: "U001" }).sort({ created_at: -1 })

// ------------------------------------------------------------------ CRUD operations

// Create
db.users.insertOne({
  user_id: "U004",
  full_name: "New Customer",
  dietary_preferences: ["vegan"]
})

// Read
db.users.find({ user_id: "U001" })

// Update
db.orders.updateOne(
  { order_id: "O003" },
  { $set: { delivery_status: "delivered" } }
)

// Delete
db.notifications.deleteOne({ notification_id: "N005" })
