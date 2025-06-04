const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 60;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:5500'}/frontend/pages/reset-password.html?token=${token}`;

    await transporter.sendMail({
      from: 'FixDepot <no-reply@fixdepot.com>',
      to: email,
      subject: 'Recuperación de contraseña',
      html: `<p>Has solicitado restablecer tu contraseña.</p><p>Haz clic en el siguiente enlace para continuar:</p><a href="${resetURL}">${resetURL}</a>`
    });

    res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo enviar el correo de recuperación' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: 'Token inválido o expirado' });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
};
