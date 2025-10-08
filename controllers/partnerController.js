const Partner = require('../models/partner');
const Order = require('../models/Order');

// Create a new partner
exports.addPartner = async (req, res) => {
  try {
    const { username, email, password, location, nomEntreprise } = req.body;

    // Check if username or email already exists
    const existing = await Partner.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newPartner = new Partner({
      username,
      email,
      password, 
      location,
      nomEntreprise
    });

    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Mettre à jour le profil partner par ID
exports.updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedPartner = await Partner.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Delete partner by ID
exports.deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPartner = await Partner.findByIdAndDelete(id);
    if (!deletedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Voir le profil fournisseur par ID
exports.getPartner = async (req, res) => {
  try {
    const { id } = req.params; // partner ID from route parameter
    const partnerProfile = await Partner.findById(id);

    if (!partnerProfile) {
      return res.status(404).json({ message: 'Profil partenaire non trouvé' });
    }

    res.json(partnerProfile);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

