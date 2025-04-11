import clippy from './assets/clippy.png';

function Clippy({ message, className }: { message?: string; className?: string }) {
  return (
    <div className={`fixed bottom-4 right-4 w-32 flex flex-col items-center z-50 ${className}`}>
      <img src={clippy} alt="Clippy" className="w-25" />
      {message && <div className="text-xs font-mono text-center bg-white px-2 py-1 rounded shadow">{message}</div>}
    </div>
  );
}

export default Clippy;