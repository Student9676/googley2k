import clippyJumping from './assets/clippy_jumping.gif';

function Clippy({ message }: { message?: string }) {
  return (
    <div className="fixed bottom-4 right-4 w-32 flex flex-col items-center z-50">
      <img src={clippyJumping} alt="Clippy" className="w-24 h-24 animate-bounce" />
      {message && <div className="text-xs font-mono text-center bg-white px-2 py-1 rounded shadow">{message}</div>}
    </div>
  );
}

export default Clippy;