const butInstall = document.getElementById("buttonInstall");
let deferredPrompt;

// Above, is a variable to hold the event and our install button.

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  deferredPrompt = event;
  // Above, we save the event to trigger later.

  butInstall.style.visibility = "visible";
  // Above, we show the install button.
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the Install");
    } else {
      console.log("User dismissed the Install");
    }

    deferredPrompt = null;
    // Above, we clear the deferredPrompt variable.
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  alert("App Install Success! ");
  console.log("👍", "appinstalled", event);

  // Above, we alert the user that the app is installed!
  // Also, we console.log the event.
});
