 interface ModalProps {
  isOpen: boolean;
  title: string;
}
export default function Modal({
  isOpen,
  title,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded">
        <h2>{title}</h2>
      </div>
    </div>
  );
}