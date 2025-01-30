export default function SearchInput({ search, onSearchChange }) {
  // 검색어 상태
  return (
    <input
      type='text'
      placeholder='...'
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{
        outline: 'none',
        border: 'none',
        padding: '0.5rem 0.8rem',
        backgroundColor: 'var(--color-background-light)',
        borderColor: '2px solid var(--color-background-light',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
        margin: '0.3rem',
        borderRadius: '1rem',
        color: 'var(--color-text)',
        fontSize: '1.2rem',
      }}
    />
  );
}
