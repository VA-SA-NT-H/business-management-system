interface Props {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({
  open,
  title,
  message,
  onClose,
  onConfirm
}: Props) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-xl font-bold mb-2">
          {title}
        </h2>

        <p className="text-slate-600">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteConfirmationModal;