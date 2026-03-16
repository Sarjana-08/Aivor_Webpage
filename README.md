# Aivor - Employee Leave Management System

A comprehensive web-based Employee Leave Management System built with HTML, CSS, and JavaScript.

## Features

### 1. **Authentication**
- Secure login system with demo credentials
- Session management
- Auto-logout after inactivity (30 minutes)
- "Remember Me" functionality

### 2. **Dashboard**
- Overview of leave balance
- Quick stats on used and remaining leaves
- Pending leave requests
- Quick navigation cards to main modules

### 3. **Leave Management**
- **Apply for Leave**: Submit new leave requests with:
  - From Date and To Date
  - Day Type (Full Day, Half Day, Off Day)
  - Leave Type (Casual, Sick, Paid, Other)
  - Reason for leave
  
- **View Leave Requests**: 
  - Table view of all leave requests
  - Filter by status (Pending, Approved, Rejected)
  - Search functionality
  - Edit and delete options
  - Pagination

### 4. **Calendar View**
- Interactive calendar showing all leaves
- Month navigation
- Color-coded leave statuses:
  - 🟢 Green: Approved Leave
  - 🟡 Yellow: Pending Leave
  - 🔴 Red: Rejected Leave
  - 🟣 Purple: Holidays
- Click on dates to see leave details

### 5. **Attendance**
- Daily and Monthly attendance logs
- Track:
  - Clock in/Clock out times
  - Total working hours
  - IP addresses
  - Location information
- Date range filtering

### 6. **Additional Modules**
- **Timesheet**: Track daily/weekly/monthly hours
- **Company Documents**: Access company policies and forms
- **Announcements**: Company news and updates

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required (uses browser localStorage)

### Installation

1. **Copy all files to a web server or open locally:**
   ```bash
   # If using a local server (e.g., Python)
   python -m http.server 8000
   
   # Then open: http://localhost:8000/index.html
   ```

2. **Or simply open `index.html` in your browser**

### Demo Credentials

Use these credentials to test the system:

| Email | Password |
|-------|----------|
| demo@aivor.com | demo123 |

## File Structure

```
Aivor/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── leave-form.html         # Apply for leave
├── leave.html              # View leave requests
├── calendar.html           # Calendar view
├── attendance.html         # Attendance records
├── timesheet.html          # Timesheet module
├── company-documents.html  # Company documents
├── announcement.html       # Announcements
├── styles.css             # Main stylesheet
├── script.js              # JavaScript functionality
└── README.md              # This file
```

## Data Storage

The system uses browser's **localStorage** to persist data:
- User authentication data
- Leave requests
- User preferences

**Note**: Data is cleared when localStorage is cleared or in private browsing mode.

## Features Breakdown

### Login Page (`index.html`)
- Clean, modern design with Aivor branding
- Email and password validation
- Remember me option
- Demo credentials displayed
- Responsive design for mobile devices

### Dashboard (`dashboard.html`)
- Welcome message
- Quick action cards
- Leave balance summary:
  - Total balance
  - Used leaves
  - Pending requests
  - Remaining balance

### Leave Form (`leave-form.html`)
- User-friendly form with validation
- Pre-filled employee information
- Date pickers for leave dates
- Dropdown selections for leave type and day type
- Text area for reason
- Submit and cancel buttons

### Leave List (`leave.html`)
- Comprehensive leave request table
- Search by name, email, or reason
- Filter by status
- Edit and delete functionality
- Responsive table design
- Pagination support

### Calendar (`calendar.html`)
- Interactive month-based calendar
- Color-coded events
- Navigation between months
- Legend explaining color codes
- Click on dates for details
- Displays holidays and special days

### Attendance (`attendance.html`)
- Daily and monthly log views
- Tab switching between views
- Date range filtering
- Detailed attendance information
- Shows clock in/out times
- Location tracking

## Keyboard Shortcuts

- **Ctrl/Cmd + Shift + L**: Quick logout

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (responsive design)

## Responsive Design

The system is fully responsive and works on:
- **Desktop**: Full features and optimized layout
- **Tablet**: Adapted layout for medium screens
- **Mobile**: Optimized for smaller screens with stacked layout

## JavaScript API Reference

### Authentication Functions
```javascript
// Check if user is logged in
getCurrentUser() // Returns user object or null

// Logout user
logout()

// Check authentication
checkAuthentication() // Redirects to login if needed
```

### Leave Management
```javascript
// Get all leaves
getLeaves() // Returns array of leaves

// Save new leave
saveLeave(leaveObject)

// Delete leave
deleteLeave(leaveId)

// Update leave
updateLeave(leaveId, updatedData)
```

### Utility Functions
```javascript
// Format date
formatDate(date)

// Calculate days between dates
getDaysBetweenDates(startDate, endDate)

// Show notification
showNotification(message, type) // type: 'success', 'error', 'info'

// Export to CSV
exportToCSV(filename)
```

## Customization

### Change Company Name
Edit in all HTML files:
- Replace "Aivor" with your company name
- Update in sidebar, headers, and login page

### Modify Colors
Edit `styles.css` CSS variables:
```css
:root {
    --primary-color: #4F46E5;
    --secondary-color: #06B6D4;
    --success-color: #10B981;
    --danger-color: #EF4444;
    /* ... more colors */
}
```

### Update Logo
Edit the SVG in each page's logo section or replace with your own image

### Add New Pages
1. Create new HTML file
2. Copy sidebar and navigation from existing page
3. Add link to sidebar nav items
4. Include `script.js` for functionality

## Security Notes

⚠️ **Important**: This is a demo/prototype system. For production use:

1. **Backend API**: This system currently uses browser localStorage. Implement a proper backend API for:
   - User authentication
   - Data persistence
   - Data encryption
   - Access control

2. **Authentication**: Implement proper security measures:
   - Password hashing
   - JWT tokens
   - Refresh tokens
   - HTTPS/SSL

3. **Data Protection**:
   - Encrypt sensitive data
   - Implement proper backup
   - Add audit logging
   - Database encryption

## Future Enhancements

- [ ] Backend API integration
- [ ] Database implementation
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Approve/Reject functionality for managers
- [ ] Mobile app version
- [ ] SMS notifications
- [ ] Integration with HR systems

## Troubleshooting

### Data Lost on Page Refresh
- Check browser's localStorage is enabled
- Check if in private/incognito mode
- Check browser's storage quota

### Login Not Working
- Clear browser cache and localStorage
- Check demo credentials are correct
- Ensure JavaScript is enabled

### Responsive Issues
- Clear browser cache
- Try different browser
- Check viewport settings

## Support & Contact

For questions or issues, please contact the development team.

---

**Version**: 1.0
**Last Updated**: March 2026
**Company**: Aivor
