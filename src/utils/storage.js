// Centralized LocalStorage Utility

export const KEYS = {
  USER: 'app_user',
  USERS: 'app_users',
  FAVORITES: 'app_favorites',
  RECENTLY_VIEWED: 'app_recently_viewed',
  PROJECTS: 'app_projects',
  SETTINGS: 'app_settings',
  NOTIFICATIONS: 'app_notifications',
  SEEDED: 'app_seeded_v3'
};

export const MALE_AVATAR_DEFAULT = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';

export const getStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting key "${key}" in localStorage:`, error);
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
};

// Seed initial demo state if not present
export const seedInitialStorage = () => {
  const FEMALE_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  // Migration check for existing stored user avatar & name
  const currentUser = getStorage(KEYS.USER, null);
  if (currentUser) {
    let updated = false;
    let newObj = { ...currentUser };
    if (newObj.name === 'Aman Sharma') {
      newObj.name = 'Aman Singh';
      updated = true;
    }
    if (!newObj.avatar || newObj.avatar === FEMALE_AVATAR) {
      newObj.avatar = MALE_AVATAR_DEFAULT;
      updated = true;
    }
    if (updated) {
      setStorage(KEYS.USER, newObj);
    }
  }

  const existingUsers = getStorage(KEYS.USERS, []);
  if (existingUsers.length > 0) {
    const updatedUsers = existingUsers.map(u => {
      let copy = { ...u };
      if (copy.name === 'Aman Sharma') copy.name = 'Aman Singh';
      if (!copy.avatar || copy.avatar === FEMALE_AVATAR) copy.avatar = MALE_AVATAR_DEFAULT;
      return copy;
    });
    setStorage(KEYS.USERS, updatedUsers);
  }

  const isSeeded = getStorage(KEYS.SEEDED, false);
  if (!isSeeded) {
    // Seed default notifications
    const initialNotifications = [
      {
        id: 'n-1',
        title: 'Welcome to TemplateCraft!',
        message: 'Explore over 30+ production-ready templates and build your project today.',
        date: new Date().toISOString(),
        read: false,
        type: 'info'
      },
      {
        id: 'n-2',
        title: 'New SaaS Templates Added',
        message: 'Check out the newly launched AI SaaS & HR Management templates.',
        date: new Date(Date.now() - 3600000 * 24).toISOString(),
        read: false,
        type: 'update'
      }
    ];

    // Seed default settings
    const defaultSettings = {
      emailNotifications: true,
      productUpdates: true,
      marketingEmails: false,
      darkMode: true,
      compactMode: false,
      accentColor: 'blue'
    };

    // Seed demo user if no users exist
    if (existingUsers.length === 0) {
      const demoUser = {
        id: 'user-demo-123',
        name: 'Aman Singh',
        email: 'demo@example.com',
        password: 'Demo@123', // NOTE: Demo authentication only
        avatar: MALE_AVATAR_DEFAULT,
        createdAt: new Date().toISOString()
      };
      setStorage(KEYS.USERS, [demoUser]);
    }

    setStorage(KEYS.NOTIFICATIONS, initialNotifications);
    setStorage(KEYS.SETTINGS, defaultSettings);
    setStorage(KEYS.FAVORITES, ['tpl-1', 'tpl-13', 'tpl-23']);
    setStorage(KEYS.RECENTLY_VIEWED, ['tpl-1', 'tpl-2', 'tpl-14']);
    setStorage(KEYS.SEEDED, true);
  }
};
