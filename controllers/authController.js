const User = require('../models/User');
const Supplier = require('../models/Supplier');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Inscription utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { nom, prenom, email, password, role, telephone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Cet email est déjà utilisé' });

    const user = await User.create({
      nom,
      prenom,
      email,
      password,
      role: role || 'client',
      telephone
    });

    if (role === 'supplier') {
      await Supplier.create({
        user: user._id,
        nomEntreprise: req.body.nomEntreprise || `${nom} ${prenom}`,
        statut: 'pending'
      });
    }

    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
  }
};

// Connexion utilisateur
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    if (!user.isActive) return res.status(403).json({ message: 'Votre compte est désactivé' });

    res.json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
};

// Obtenir l'utilisateur connecté
exports.getMe = async (req, res) => {
  res.json(req.user);
};
