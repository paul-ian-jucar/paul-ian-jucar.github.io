$(document).ready(function () {
    // Back to top button functionality
    const $backToTop = $('#back-to-top');

    // Hide the button initially
    $backToTop.hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $backToTop.fadeIn(300);
        } else {
            $backToTop.fadeOut(300);
        }
    });

    $backToTop.click(function () {
        $('html, body').animate({ scrollTop: 0 }, 600, 'easeOutCubic');
        return false;
    });

    // Mobile sidebar toggle functionality
    const $sidebar = $('#sidebar');
    const $sidebarOverlay = $('#sidebarOverlay');

    function toggleSidebar() {
        $sidebar.toggleClass('show');
        $sidebarOverlay.toggleClass('show');
        $sidebarOverlay.addClass('position-fixed top-0 start-0');
    }

    function closeSidebar() {
        $sidebar.removeClass('show');
        $sidebarOverlay.removeClass('show');
        $sidebarOverlay.removeClass('position-fixed top-0 start-0');
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
    const scrollSpyElement = $('.px-5')[0];
    if (scrollSpyElement && bootstrap && bootstrap.ScrollSpy) {
        const scrollSpy = new bootstrap.ScrollSpy(scrollSpyElement, {
            target: '#sideNav',
            offset: 0
        });
    }
});

