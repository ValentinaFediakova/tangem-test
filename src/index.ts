import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const bottomBanner = document.getElementById("card");
  const closeButton = document.querySelector(".discount-card-button-close");
  const shopButton = document.querySelector(".header-button-shop");

  if (!header || !bottomBanner || !closeButton || !shopButton) {
    console.error("Required elements are not found on the page.");
    return;
  }

  const isBannerClosed = localStorage.getItem("cardClosed");

  if (!isBannerClosed) {
    bottomBanner.style.display = "flex";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          bottomBanner.classList.add("discount-card_show");
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(header);

    closeButton.addEventListener("click", closeBanner);
    (closeButton as HTMLElement).addEventListener(
      "keydown",
      (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          closeBanner();
        }
      }
    );

    (shopButton as HTMLElement).addEventListener(
      "keydown",
      (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          goToShop();
        }
      }
    );
  }

  function closeBanner(): void {
    if (bottomBanner) {
      bottomBanner.classList.remove("discount-card_show");
    }

    if (bottomBanner) {
      bottomBanner.addEventListener(
        "transitionend",
        () => {
          bottomBanner.style.display = "none";
          bottomBanner.style.transition = "none";
        },
        { once: true }
      );
    }

    localStorage.setItem("cardClosed", "true");
  }

  function goToShop(): void {
    window.location.href = "/shop";
  }
});
