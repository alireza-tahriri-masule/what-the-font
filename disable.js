document.removeEventListener("mouseover", showFontInfo);
document.removeEventListener("mouseout", hideFontInfo);

const existingTooltip = document.querySelector("div[style*='z-index: 10000']");
if (existingTooltip) {
  existingTooltip.remove();
}
