function SearchBar({ value, onChange, onSearch }) {
  const submit = (e) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <form onSubmit={submit}>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search for songs"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
