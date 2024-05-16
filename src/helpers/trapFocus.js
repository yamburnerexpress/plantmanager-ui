export const trapFocus = (ref, onEscape) => {
  const modalElement = ref.current;
  //add any focusable HTML element you want to include to this string
  const focusableElements = modalElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKeyPress = (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  const handleEscapeKeyPress = (event) => {
    if (event.key === "Escape") {
      onEscape();
    }
  };

  firstElement.focus();
  modalElement.addEventListener("keydown", handleTabKeyPress);
  modalElement.addEventListener("keydown", handleEscapeKeyPress);

  return () => {
    modalElement.removeEventListener("keydown", handleTabKeyPress);
    modalElement.removeEventListener("keydown", handleEscapeKeyPress);
  };
}