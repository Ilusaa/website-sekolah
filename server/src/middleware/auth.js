import jwt from 'jsonwebtoken';

export function wajibLogin(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ pesan: 'Silakan login terlebih dahulu.' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ pesan: 'Sesi berakhir. Silakan login kembali.' });
  }
}

export const wajibAdmin = (req, res, next) =>
  req.user?.role === 'admin' ? next() : res.status(403).json({ pesan: 'Khusus admin.' });
