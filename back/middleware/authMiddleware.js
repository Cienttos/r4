import { supabase } from '../config/supabase.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token using Supabase
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error) {
        console.error('Supabase auth error:', error.message);
        return res.status(401).json({ error: 'Not authorized, token failed' });
      }

      // Attach user to the request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};