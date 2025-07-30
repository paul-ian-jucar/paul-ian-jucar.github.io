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
    $('.nav-link').on('click', function (e) {
        if ($(window).width() < 768) {
            closeSidebar();
        }
        
        // Handle smooth scrolling with offset for sticky header
        const href = $(this).attr('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                // Calculate top bar height + 10px padding
                const topBarHeight = $('.sticky-top').outerHeight() || 70; // fallback to 70px
                const offset = topBarHeight + 1;
                const targetPosition = target.offset().top - offset;
                
                $('html, body').animate({
                    scrollTop: targetPosition
                }, 600, 'easeOutCubic');
            }
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

    // Contact form functionality
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const $form = $(this);
        const $submitBtn = $form.find('button[type="submit"]');
        const originalBtnText = $submitBtn.html();
        
        // Get form data
        const formData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            message: $('#message').val().trim()
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Disable submit button and show loading state
        $submitBtn.prop('disabled', true).html('<i class="bi bi-hourglass-split me-2"></i>Sending...');
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Success feedback
            $submitBtn.html('<i class="bi bi-check-circle me-2"></i>Message Sent!');
            $form[0].reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                $submitBtn.prop('disabled', false).html(originalBtnText);
            }, 3000);
            
            // You can replace this with actual form submission to your backend
            console.log('Form submitted:', formData);
        }, 2000);
    });

    // Skills Sortable functionality
    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer) {
        Sortable.create(skillsContainer, {
            onStart: function() {
                skillsContainer.classList.add('skills-dragging');
            },
            onEnd: function() {
                skillsContainer.classList.remove('skills-dragging');
            }
        });
    }
});

