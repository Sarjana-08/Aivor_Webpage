// Aivor - Configuration File
// Easily customize your application settings here

const AivorConfig = {
    // Company Information
    company: {
        name: 'Aivor',
        tagline: 'Employee Leave Management System',
        website: 'https://aivor.com',
        email: 'support@aivor.com',
        phone: '+1-XXX-XXX-XXXX'
    },

    // Colors (update these to match your brand)
    colors: {
        primary: '#4F46E5',
        secondary: '#06B6D4',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        dark: '#1F2937',
        light: '#F3F4F6',
        border: '#E5E7EB',
        text: '#374151'
    },

    // Leave Types
    leaveTypes: [
        { value: 'casualLeave', label: 'Casual Leave' },
        { value: 'sickLeave', label: 'Sick Leave' },
        { value: 'paidLeave', label: 'Paid Leave' },
        { value: 'otherLeave', label: 'Other Leave' }
    ],

    // Day Types
    dayTypes: [
        { value: 'fullDay', label: 'Full Day' },
        { value: 'halfDay', label: 'Half Day' },
        { value: 'offDay', label: 'Off Day' }
    ],

    // Leave Balance (per employee)
    leaveBalance: {
        totalAnnual: 20,
        casualLeave: 12,
        sickLeave: 5,
        paidLeave: 3
    },

    // Session Settings
    session: {
        inactivityTimeout: 30 * 60 * 1000, // 30 minutes
        tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
        autoLogout: true
    },

    // UI Settings
    ui: {
        theme: 'light', // 'light' or 'dark'
        language: 'en', // 'en', 'es', 'fr', etc
        itemsPerPage: 10,
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h' // '24h' or '12h'
    },

    // Email Configuration (for future implementation)
    email: {
        enabled: false,
        provider: 'gmail', // 'gmail', 'sendgrid', 'mailgun'
        from: 'noreply@aivor.com',
        senderName: 'Aivor HR System',
        notifications: {
            leaveApproved: true,
            leaveRejected: true,
            leaveReminder: true,
            attendanceReport: false
        }
    },

    // Holiday Dates
    holidays: [
        { date: '2026-03-08', name: 'International Women\'s Day' },
        { date: '2026-03-20', name: 'Vernal Equinox' },
        { date: '2026-04-17', name: 'Good Friday' },
        { date: '2026-05-01', name: 'Labor Day' },
        { date: '2026-07-04', name: 'Independence Day' },
        { date: '2026-12-25', name: 'Christmas Day' }
    ],

    // Demo Users (for testing)
    demoUsers: [
        {
            email: 'demo@aivor.com',
            password: 'demo123',
            name: 'Demo User',
            userEmail: 'demo@aivor.com',
            role: 'employee',
            department: 'IT'
        },
        {
            email: 'john@aivor.com',
            password: 'john123',
            name: 'John Doe',
            userEmail: 'john@aivor.com',
            role: 'manager',
            department: 'HR'
        },
        {
            email: 'admin@aivor.com',
            password: 'admin123',
            name: 'Admin User',
            userEmail: 'admin@aivor.com',
            role: 'admin',
            department: 'Admin'
        }
    ],

    // Feature Toggles
    features: {
        leaveManagement: true,
        attendance: true,
        timesheet: true,
        calendar: true,
        reports: true,
        notifications: true,
        mobileApp: false,
        advancedAnalytics: false,
        multiLanguage: false
    },

    // API Endpoints (when backend is implemented)
    api: {
        baseUrl: 'https://api.aivor.com/v1',
        endpoints: {
            auth: '/auth',
            leaves: '/leaves',
            attendance: '/attendance',
            users: '/users',
            reports: '/reports',
            documents: '/documents'
        }
    },

    // Navigation Links
    navigation: [
        { href: 'dashboard.html', label: 'Dashboard', icon: '📊' },
        { href: 'timesheet.html', label: 'Timesheet', icon: '⏱️' },
        { href: 'attendance.html', label: 'Attendance', icon: '📋' },
        { href: 'company-documents.html', label: 'Company Documents', icon: '📄' },
        { href: 'announcement.html', label: 'Announcement', icon: '📢' },
        { href: 'leave.html', label: 'Leave', icon: '📅' },
        { href: 'calendar.html', label: 'Calendar', icon: '📆' }
    ],

    // Logging Configuration
    logging: {
        enabled: true,
        level: 'info', // 'debug', 'info', 'warn', 'error'
        console: true,
        localStorage: true,
        maxLogs: 1000
    },

    // Accessibility Settings
    accessibility: {
        highContrast: false,
        fontSize: 'normal', // 'small', 'normal', 'large', 'xlarge'
        animations: true,
        screenReaderMode: false
    },

    // Get Configuration Value
    get: function(key) {
        return this[key] || null;
    },

    // Update Configuration
    set: function(key, value) {
        this[key] = value;
        this.save();
    },

    // Save to LocalStorage
    save: function() {
        localStorage.setItem('aivor_config', JSON.stringify(this));
    },

    // Load from LocalStorage
    load: function() {
        const saved = localStorage.getItem('aivor_config');
        if (saved) {
            Object.assign(this, JSON.parse(saved));
        }
    }
};

// Load configuration on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        AivorConfig.load();
    });
}

// Make configuration available globally
if (typeof window !== 'undefined') {
    window.AivorConfig = AivorConfig;
}

// Export for Node.js/modules compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AivorConfig;
}
