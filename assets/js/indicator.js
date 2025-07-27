function updateOnlineStatus() {
    if (navigator.onLine) {
        $('#status-indicator').html('<i class="online-indicator"></i>Online');
    } else {
        $('#status-indicator').html('<i class="offline-indicator"></i>Offline');
    }
}

$(window).on({
    'online': updateOnlineStatus,
    'offline': updateOnlineStatus
});

$(document).ready(updateOnlineStatus);