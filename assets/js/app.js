$(document).ready(function () {
    // Mobile sidebar toggle functionality
    const $sidebar = $('#sidebar');
    const $sidebarOverlay = $('#sidebarOverlay');

    function toggleSidebar() {
        $sidebar.toggleClass('show');
        $sidebarOverlay.toggleClass('show');
    }

    function closeSidebar() {
        $sidebar.removeClass('show');
        $sidebarOverlay.removeClass('show');
    }

    // Sidebar toggle events
    $('#sidebarToggle').on('click', toggleSidebar);
    $sidebarOverlay.on('click', closeSidebar);

    // Close sidebar when clicking nav links on mobile
    $('.nav-link').on('click', function () {
        if ($(window).width() < 768) {
            closeSidebar();
        }
    });

    // Handle window resize
    $(window).on('resize', function () {
        if ($(window).width() >= 768) {
            closeSidebar();
        }
    });

    // Bootstrap ScrollSpy activation
    const scrollSpy = new bootstrap.ScrollSpy($('.px-5')[0], {
        target: '#sideNav',
        offset: 0
    });
});

