const Printer = require('../models/printer');

// Add a new printer for a specific partner (from URL)
exports.addPrinter = async (req, res) => {
  try {
    const { partnerId } = req.params; // get partnerId from URL
    const { brandName, model, type, volumeMax } = req.body;

    // Check required fields
    if (!brandName || !type) {
      return res.status(400).json({ message: 'brandName and type are required' });
    }

    const newPrinter = new Printer({
      partner: partnerId,
      brandName,
      model,
      type,
      volumeMax
    });

    await newPrinter.save();
    res.status(201).json(newPrinter);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Update a printer by its ID
exports.updatePrinter = async (req, res) => {
  try {
    const { printerId } = req.params; // use printerId instead of id (for clarity)
    const updates = req.body;

    const updatedPrinter = await Printer.findByIdAndUpdate(printerId, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedPrinter) {
      return res.status(404).json({ message: 'Printer not found' });
    }

    res.json(updatedPrinter);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Delete a printer by its ID
exports.deletePrinter = async (req, res) => {
  try {
    const { printerId } = req.params; // use printerId for consistency

    const deletedPrinter = await Printer.findByIdAndDelete(printerId);
    if (!deletedPrinter) {
      return res.status(404).json({ message: 'Printer not found' });
    }

    res.json({ message: 'Printer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
