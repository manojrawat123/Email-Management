const createField = (type, id, name, required, placeholder, options = null, icons) => ({
    type,
    id,
    name,
    required,
    placeholder,
    icon: icons,
});
export default createField;