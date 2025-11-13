import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


exports.registerUser = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ nombre, email, password: hashedPassword, rol });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log("📩 Body recibido en loginUser:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log("🔍 Usuario encontrado:", user ? user.email : "No existe");

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Contraseña coincide:", isMatch);

    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("✅ Token generado correctamente para:", user.email);
    res.status(200).json({ message: 'Login exitoso', token, rol: user.rol });
  } catch (error) {
    console.error("💥 Error en loginUser:", error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

