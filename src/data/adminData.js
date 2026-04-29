export const adminStats = {
  revenue: { value: '$1,284,500', change: '+15.4%', positive: true, label: 'Gross Revenue' },
  orders: { value: '8,432', change: '+9.1%', positive: true, label: 'Total Orders' },
  users: { value: '42.1k', change: '-2.3%', positive: false, label: 'Active Users' },
  avgOrder: { value: '$152.40', change: '-8.7%', positive: false, label: 'Avg. Order Value' },
};

export const revenueData = [
  { month: 'Aug', revenue: 38000 },
  { month: 'Sep', revenue: 52000 },
  { month: 'Oct', revenue: 45000 },
  { month: 'Nov', revenue: 61000 },
  { month: 'Dec', revenue: 89000 },
  { month: 'Jan', revenue: 124500 },
];

export const topCollections = [
  { id: 1, name: 'Noir Elegance', revenue: '$284,200', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=80&h=80&fit=crop&q=80' },
  { id: 2, name: 'Heritage Time', revenue: '$198,400', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop&q=80' },
  { id: 3, name: 'Solar Scents', revenue: '$142,800', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=80&h=80&fit=crop&q=80' },
];

export const systemActivity = [
  { id: 1, type: 'order', icon: '🛍', title: 'New Order #TRX-9482', body: 'From Paris, FR', time: '3 minutes ago', color: 'cyan' },
  { id: 2, type: 'user', icon: '👤', title: 'Customer Registration', body: 'Marco V.', time: '10 minutes ago', color: 'green' },
  { id: 3, type: 'stock', icon: '⚠', title: 'Stock Alert: Silk Scarf', body: 'Low inventory', time: '1 hour ago', color: 'amber' },
  { id: 4, type: 'payout', icon: '💳', title: 'Payout Disbursed', body: '$42,000.00', time: '3 hours ago', color: 'blue' },
];

export const adminOrders = [
  { id: 'TRX-9482', customer: 'Marie Laurent', product: 'Star-Dust Collier', amount: '$48,200', status: 'shipped', date: '2024-01-15' },
  { id: 'TRX-9481', customer: 'James Whitfield', product: 'Meridian Timepiece', amount: '$4,200', status: 'delivered', date: '2024-01-14' },
  { id: 'TRX-9480', customer: 'Sofia Chen', product: 'Quilted Bijou Bag', amount: '$2,850', status: 'pending', date: '2024-01-14' },
  { id: 'TRX-9479', customer: 'Marco Visconti', product: 'Midnight Croco Satchel', amount: '$4,350', status: 'delivered', date: '2024-01-13' },
  { id: 'TRX-9478', customer: 'Amara Osei', product: 'Essence d\'Aether', amount: '$1,240', status: 'shipped', date: '2024-01-12' },
];

export const adminUsers = [
  { id: 1, name: 'Marie Laurent', email: 'marie@example.com', role: 'client', orders: 12, spent: '$62,400', joined: '2023-08-01', avatar: 'ML' },
  { id: 2, name: 'James Whitfield', email: 'james@example.com', role: 'client', orders: 8, spent: '$21,800', joined: '2023-09-15', avatar: 'JW' },
  { id: 3, name: 'Admin User', email: 'admin@aether.com', role: 'admin', orders: 0, spent: '$0', joined: '2023-01-01', avatar: 'AU' },
  { id: 4, name: 'Sofia Chen', email: 'sofia@example.com', role: 'client', orders: 5, spent: '$14,250', joined: '2023-11-20', avatar: 'SC' },
];
