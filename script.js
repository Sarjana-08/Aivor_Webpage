// ==================== LOGIN FUNCTIONALITY ====================

// Sample user credentials for demo
const demoUsers = [
    {
        email: 'demo@aivor.com',
        password: 'demo123',
        name: 'Demo User',
        userEmail: 'demo@aivor.com'
    },
    {
        email: 'john@aivor.com',
        password: 'john123',
        name: 'John Doe',
        userEmail: 'john@aivor.com'
    }
];

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Check if user is on a protected page
    if (window.location.pathname.includes('dashboard') || 
        window.location.pathname.includes('leave') ||
        window.location.pathname.includes('attendance') ||
        window.location.pathname.includes('calendar')) {
        checkAuthentication();
    }

    // Set user name on dashboard pages
    const userNameElements = document.querySelectorAll('#userName');
    const userAvatarElements = document.querySelectorAll('#userAvatar');
    
    userNameElements.forEach(el => {
        const user = getCurrentUser();
        if (user) {
            el.textContent = user.name;
        }
    });

    userAvatarElements.forEach(el => {
        const user = getCurrentUser();
        if (user) {
            // Generate initials from name
            const initials = user.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);
            el.textContent = initials;
        }
    });
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Find user in demo users
    const user = demoUsers.find(u => u.email === email && u.password === password);

    if (user) {
        // Store user data in localStorage
        localStorage.setItem('aivor_user', JSON.stringify({
            email: user.email,
            name: user.name,
            userEmail: user.userEmail,
            loginTime: new Date().toISOString()
        }));

        if (remember) {
            localStorage.setItem('aivor_remember', 'true');
        }

        // Show success message
        showNotification('Login successful! Redirecting...', 'success');

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showNotification('Invalid email or password!', 'error');
    }
}

// Check if user is authenticated
function checkAuthentication() {
    const user = localStorage.getItem('aivor_user');
    if (!user) {
        window.location.href = 'index.html';
    }
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('aivor_user');
    return user ? JSON.parse(user) : null;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('aivor_user');
        localStorage.removeItem('aivor_remember');
        window.location.href = 'index.html';
    }
}

// ==================== NOTIFICATION SYSTEM ====================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-success {
                background-color: #10B981;
            }
            .notification-error {
                background-color: #EF4444;
            }
            .notification-info {
                background-color: #3B82F6;
            }
            .notification-warning {
                background-color: #F59E0B;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== SIDEBAR FUNCTIONALITY ====================

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

// ==================== DATE UTILITIES ====================

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

function getDaysBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceTime = Math.abs(end - start);
    const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
    return differenceDays + 1; // Include both start and end date
}

// ==================== FORM VALIDATION ====================

function validateLeaveForm() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const dayType = document.getElementById('dayType').value;
    const leaveType = document.getElementById('leaveType').value;

    let errors = [];

    if (!fromDate) {
        errors.push('From Date is required');
    }
    if (!toDate) {
        errors.push('To Date is required');
    }
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
        errors.push('From Date must be before To Date');
    }
    if (!dayType) {
        errors.push('Day Type is required');
    }
    if (!leaveType) {
        errors.push('Leave Type is required');
    }

    return errors;
}

// ==================== LOCAL STORAGE FUNCTIONS ====================

function getLeaves() {
    const leaves = localStorage.getItem('aivor_leaves');
    return leaves ? JSON.parse(leaves) : [];
}

function saveLeave(leave) {
    const leaves = getLeaves();
    leaves.push({
        ...leave,
        id: Date.now(),
        status: 'pending',
        appliedDate: new Date().toLocaleDateString()
    });
    localStorage.setItem('aivor_leaves', JSON.stringify(leaves));
    return leave;
}

function deleteLeave(id) {
    const leaves = getLeaves();
    const filtered = leaves.filter(leave => leave.id !== id);
    localStorage.setItem('aivor_leaves', JSON.stringify(filtered));
}

function updateLeave(id, updatedLeave) {
    const leaves = getLeaves();
    const index = leaves.findIndex(leave => leave.id === id);
    if (index !== -1) {
        leaves[index] = { ...leaves[index], ...updatedLeave };
        localStorage.setItem('aivor_leaves', JSON.stringify(leaves));
    }
}

// ==================== EXPORT FUNCTIONALITY ====================

function exportToCSV(filename = 'data.csv') {
    const leaves = getLeaves();
    let csv = 'Name,Email,From Date,To Date,Leave Type,Status,Applied Date\n';
    
    leaves.forEach(leave => {
        csv += `"${leave.name}","${leave.email}","${leave.fromDate}","${leave.toDate}","${leave.leaveType}","${leave.status}","${leave.appliedDate}"\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function exportToPDF(filename = 'leave_report.pdf') {
    alert('PDF export requires a library like jsPDF. This functionality can be extended.');
}

// ==================== SEARCH AND FILTER ====================

function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    const filter = input.value.toUpperCase();
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        let found = false;
        const cells = rows[i].getElementsByTagName('td');
        
        for (let j = 0; j < cells.length; j++) {
            const text = cells[j].textContent || cells[j].innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }

        rows[i].style.display = found ? '' : 'none';
    }
}

// ==================== CHART UTILITIES ====================

function createChart(canvasId, type, data, options = {}) {
    // This would require Chart.js library
    console.log(`Chart creation would require Chart.js library for ${canvasId}`);
}

// ==================== MODAL FUNCTIONS ====================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// ==================== UTILITY FUNCTIONS ====================

function getCurrentMonthYear() {
    const options = { month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getMonthName(monthNumber) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1];
}

// ==================== KEYBOARD SHORTCUTS ====================

document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Shift + L for Logout
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'L') {
        logout();
    }
});

// ==================== LOADING SPINNER ====================

function showLoader(message = 'Loading...') {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;

    if (!document.getElementById('loader-styles')) {
        const style = document.createElement('style');
        style.id = 'loader-styles';
        style.textContent = `
            .loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            .loader-content {
                background: white;
                padding: 40px;
                border-radius: 12px;
                text-align: center;
            }
            .spinner {
                border: 4px solid #f3f3f3;
                border-radius: 50%;
                border-top: 4px solid #4F46E5;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// ==================== PERMISSION CHECKS ====================

function hasPermission(permission) {
    const user = getCurrentUser();
    if (!user) return false;
    
    // This can be extended based on user roles
    const permissions = {
        'admin': ['view', 'edit', 'delete', 'approve'],
        'manager': ['view', 'edit', 'reject'],
        'employee': ['view', 'create']
    };

    return true; // Simplified for demo
}

// ==================== API SIMULATION ====================

async function simulateAPICall(endpoint, method = 'GET', data = null) {
    showLoader('Processing...');

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            hideLoader();
            resolve({
                success: true,
                message: 'Operation completed successfully',
                data: data
            });
        }, 1000);
    });
}

// ==================== INITIALIZATION ====================

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Add any global initialization code here
    console.log('Aivor Leave Management System initialized');
});

// Prevent right-click in production (optional)
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
//     return false;
// });

// Handle page visibility
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User left the page');
    } else {
        console.log('User returned to the page');
    }
});

// Auto-logout after inactivity
let inactivityTimeout;
const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutes

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    
    if (getCurrentUser()) {
        inactivityTimeout = setTimeout(function() {
            logout();
        }, INACTIVITY_TIME);
    }
}

document.addEventListener('mousedown', resetInactivityTimer);
document.addEventListener('keydown', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
document.addEventListener('touchstart', resetInactivityTimer);

// Initialize timer
resetInactivityTimer();

// Export utilities for external use
window.AivorUtils = {
    formatDate,
    getDaysBetweenDates,
    getLeaves,
    saveLeave,
    deleteLeave,
    updateLeave,
    exportToCSV,
    showNotification,
    getCurrentUser,
    logout
};
