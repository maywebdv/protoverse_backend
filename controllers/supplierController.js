const Supplier = require('../models/Supplier');
const Order = require('../models/Order');

// Voir le profil fournisseur
exports.getProfile = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user._id });
    if (!supplier) return res.status(404).json({ message: 'Profil fournisseur non trouvé' });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Mettre à jour le profil fournisseur
exports.updateProfile = async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Récupérer les commandes reçues par le fournisseur
exports.getOrders = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ user: req.user._id });
    const orders = await Order.find({ supplier: supplier._id })
      .populate('client', 'nom prenom email telephone')
      .sort('-dateCommande');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Accepter une commande
exports.acceptOrder = async (req, res) => {
  try {
    const { delaiEstime, prix } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        statut: 'accepted',
        delaiEstime,
        'prix.total': prix,
        $push: {
          historique: {
            statut: 'accepted',
            date: Date.now(),
            commentaire: 'Commande acceptée par le fournisseur'
          }
        }
      },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
