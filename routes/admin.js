const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Partner = require('../models/partner');
const Order = require('../models/Order');
const User = require('../models/User');

// Toutes les routes admin nécessitent authentification et rôle admin
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/suppliers/pending
// @desc    Liste des fournisseurs en attente de validation
// @access  Admin
router.get('/suppliers/pending', async (req, res) => {
  try {
    const suppliers = await Partner.find({ statut: 'pending' })
      .populate('user', 'nom prenom email telephone')
      .sort('-createdAt');
    
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// @route   PUT /api/admin/suppliers/:id/validate
// @desc    Valider un fournisseur
// @access  Admin
router.put('/suppliers/:id/validate', async (req, res) => {
  try {
    const { statut, commentaire } = req.body; // approved ou rejected

    const supplier = await Partner.findByIdAndUpdate(
      req.params.id,
      { 
        statut,
        $push: {
          historique: {
            action: statut,
            date: Date.now(),
            commentaire,
            admin: req.user._id
          }
        }
      },
      { new: true }
    ).populate('user');

    if (!supplier) {
      return res.status(404).json({ message: 'Fournisseur non trouvé' });
    }

    // TODO: Envoyer email de notification au fournisseur

    res.json({ 
      message: `Fournisseur ${statut === 'approved' ? 'validé' : 'rejeté'} avec succès`,
      supplier 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// @route   GET /api/admin/orders
// @desc    Liste de toutes les commandes
// @access  Admin
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('client', 'nom prenom email')
      .populate({
        path: 'partner',
        populate: { path: 'user', select: 'nom prenom email' }
      })
      .sort('-dateCommande');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// @route   GET /api/admin/stats
// @desc    Statistiques générales
// @access  Admin
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      users: {
        total: await User.countDocuments(),
        clients: await User.countDocuments({ role: 'client' }),
        suppliers: await User.countDocuments({ role: 'supplier' }),
        admins: await User.countDocuments({ role: 'admin' })
      },
      suppliers: {
        pending: await Partner.countDocuments({ statut: 'pending' }),
        approved: await Partner.countDocuments({ statut: 'approved' }),
        rejected: await Partner.countDocuments({ statut: 'rejected' })
      },
      orders: {
        total: await Order.countDocuments(),
        pending: await Order.countDocuments({ statut: 'pending_supplier' }),
        inProduction: await Order.countDocuments({ statut: 'in_production' }),
        completed: await Order.countDocuments({ statut: 'completed' })
      }
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;
