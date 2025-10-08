const Partner = require('../models/partner');
const Order = require('../models/Order');

// Liste des fournisseurs disponibles
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Partner.find({ 
      statut: 'approved',
      disponible: true 
    }).populate('user', 'nom prenom email ville');
    
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Créer une commande
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      client: req.user._id,
      ...req.body
    });
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
  }
};

// Récupérer les commandes du client
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ client: req.user._id })
      .populate({
        path: 'partner',
        populate: { path: 'user', select: 'nom prenom' }
      })
      .sort('-dateCommande');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
