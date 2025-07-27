// Mobile sidebar toggle functionality
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    sidebar.classList.toggle('show');
    sidebarOverlay.classList.toggle('show');
}

function closeSidebar() {
    sidebar.classList.remove('show');
    sidebarOverlay.classList.remove('show');
}

sidebarToggle.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when clicking nav links on mobile
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            closeSidebar();
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        closeSidebar();
    }
});

// Bootstrap ScrollSpy activation
const scrollSpy = new bootstrap.ScrollSpy(document.querySelector('.px-5'), {
    target: '#sideNav',
    offset: 0
});

// Online/Offline status handling
function updateOnlineStatus() {
    const statusIndicator = document.getElementById('status-indicator');
    if (navigator.onLine) {
        statusIndicator.innerHTML = '<i class="online-indicator"></i>Online';
    } else {
        statusIndicator.innerHTML = '<i class="offline-indicator"></i>Offline';
    }
}

// Add event listeners for online/offline events
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Initial status check
updateOnlineStatus();

