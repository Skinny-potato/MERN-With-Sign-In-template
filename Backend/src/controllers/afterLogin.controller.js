export const publicTest = async (req, res) => {
    try {
      res.json({ message: "This is a public test route" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const profile = async (req, res) => {
    try {
      res.json({
        message: "You accessed a protected route!",
        user: req.user
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const dashboard = async (req, res) => {
    try {
      res.json({
        message: "Dashboard data for authenticated users",
        userId: req.user.id
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const updateProfile = async (req, res) => {
    try {
      res.json({
        message: "Profile updated successfully (dummy)",
        updatedData: req.body
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  