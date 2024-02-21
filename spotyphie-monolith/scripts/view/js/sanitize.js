function sanitize(str) {
    const div = document.createElement('DIV');
    div.textContent = str;

    return div.innerHTML;
}

export default sanitize;