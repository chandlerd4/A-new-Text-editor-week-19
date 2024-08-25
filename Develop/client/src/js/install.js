const butInstall = document.getElementById('buttonInstall');

// Handle the `beforeinstallprompt` event
const handleBeforeInstallPrompt = (event) => {
    window.deferredPrompt = event;
    butInstall.classList.remove('hidden');
};

// Handle the install button click event
const handleInstallClick = async () => {
    console.log('Install button clicked');
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) return;

    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.add('hidden');
};

// Handle the `appinstalled` event
const handleAppInstalled = () => {
    console.log('PWA was installed');
    alert('The app was installed');
    window.deferredPrompt = null;
};

// Attach event listeners
window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
butInstall.addEventListener('click', handleInstallClick);
window.addEventListener('appinstalled', handleAppInstalled);
